import React, {useContext, useEffect, useState} from "react";
import "../../../src/assets/css/index.css";
import "../../../src/assets/css/base.css";
import Sections from "components/special/sections/Sections";
import userService from "services/user.service";
import {Button, Col, Container, ListGroup, Row} from "reactstrap";
import PdfViewer from "components/special/Pdf-render/PdfViewer";
import PreferenceBare from "components/special/PreferenceBare";
import {Download, Gear, FilePost, UiChecks ,Fullscreen,FullscreenExit ,ZoomIn,ZoomOut , NodePlus, PlusCircle} from "react-bootstrap-icons";
import {getPreference} from "hooks/preferences";
import convertPdfToImages from "components/special/Helper-component/PdfAsImage";
import {useHistory} from "react-router-dom";
import {useDebounced} from "../../hooks/useDebounced";
import {LanguageContext} from "../../localeContext";
import ProfilePersonel from "../../components/special/sections/ProfilePersonel";
import DescriptionProfil from "../../components/special/sections/DescriptionProfil";
import Fromations from "../../components/special/sections/Fromations";
import ExperienceProfessionel from "../../components/special/sections/ExperienceProfessionel";
import Stages from "../../components/special/sections/Stages";
import Competances from "../../components/special/sections/Competances";
import Langue from "../../components/special/sections/Langue";
import CentreInteret from "../../components/special/sections/CentreInteret";
import {  Element , scroller } from 'react-scroll'
import { Accordion, Paper } from "@mui/material";
import L from "locale";


const Templating = (props) => {


    const [Tik, setTik] = useState(0);
    const [PrefStatus, setPrefStatus] = useState(false);
    const [Cv, updateCv] = useState(props?.currentCv ? props?.currentCv : null);
    const [DebouncedCv, setDebouncedCv] = useState();
    const [PrefButtonClass, setPrefButtonClass] = useState("prefrences-button");
    const [UrlDownload, setUrlDownload] = useState("");
    const history = useHistory();
    const [toggleDisplay,setToggleDispay] = useState(false);
    const [FullScreen, setFullScreen] = useState(false);
    const [activeSection, setActiveSection] = useState("ProfilePersonel");
    const [cvzoom, setCvzoom] = useState(1);

    console.log("my mode",props.mode)


    const toggle = () => {
        setToggleDispay(!toggleDisplay)
    }

    const [Langage, setLang] = useContext(LanguageContext)

    useEffect(() => {

        document.body.style.backgroundColor = "#f3f2ef";

        if (typeof props.currentCv != "undefined") {
            if (Object.entries(props.currentCv).length > 0) {
                updateCv(props.currentCv);
            } else {
                history.push("/app/user-information");
            }
        }


        window.addEventListener("resize",  resize );


        const int = setInterval(() => {
            setTik((Tik) => Tik + 1);
        }, 10000);
        return () => {
            clearInterval(int);
            window.removeEventListener("resize", resize);
        };
    }, []);

    useEffect(() => {
        if (!Cv?.preference?.order) {
            if(Cv?.preference) {
                let CvCopy = {...Cv}
                CvCopy.preference.order = {
                    profile: [
                        {name: "ProfilePersonel", order: 0},
                        {name: "DescriptionProfil", order: 1}
                    ],
                    bigBlok: [
                        {name: "Fromations", order: 0},
                        {name: "ExperienceProfessionel", order: 2},
                        {name: "Stage", order: 1}
                    ],
                    Blok: [
                        {name: "Competances", order: 0},
                        {name: "Langue", order: 1},
                        {name: "CentreInteret", order: 2}
                    ]
                }
                updateCv(CvCopy);
            }
        }
    }, [Cv])


    const resize = (e) => {
      if(window.innerWidth < 991 ){
          setFullScreen(false)
      }
    }

    /*useEffect(() => {
        if (
            typeof props.currentCv?.id != "undefined" &&
            Object.keys(Cv ? Cv : []).length !== 0
        ) {
            if (UrlDownload) {
                convertPdfToImages(UrlDownload).then(thumbnail => {
                    const pref = {...Cv.preference, thumb: thumbnail}
                    userService.updateUserCv(Cv.data, pref, props.currentCv.id);
                })
            }
        }
    }, [Tik]);*/

    const updateMainDataModel = (sections, data) => {
        let CvCopy = {...Cv};
        CvCopy.data[sections] = data;
        updateCurrentCv(CvCopy)
    };

    const updateCurrentCv = (cv) => {
        updateCv(cv)
    }

    useDebounced(() => {

        if (typeof Cv != "undefined") {
            setDebouncedCv(Cv)
        }

    }, [Cv], 1000);


    useDebounced(()=>{
        if (
            typeof props.currentCv?.id != "undefined" &&
            Object.keys(Cv ? Cv : []).length !== 0
        ) {
            if (UrlDownload) {
                convertPdfToImages(UrlDownload).then(thumbnail => {
                    const pref = {...Cv.preference, thumb: thumbnail}
                    userService.updateUserCv(Cv.data, pref, props.currentCv.id);
                })
            }
        }
    },[UrlDownload],3000)

    const getPreferences = () => {
        setPrefStatus(true);
    };

    const sortSections = (sections) => {
        let sortedSection = []
        let order = Cv?.preference?.order
        if (order) {
            sections.forEach((elm) => {
                order.profile.forEach((ordc)=>{
                    if(elm.name == ordc.name){
                        sortedSection[ordc.order] = elm
                    }
                })
                 order.bigBlok.forEach((orda)=>{
                    if(elm.name == orda.name){
                        sortedSection[orda.order+2] = elm
                    }
                 })
                order.Blok.forEach((ordb)=>{
                    if(elm.name == ordb.name){
                        sortedSection[ordb.order+6] = elm
                    }
                })
            })
            return sortedSection
        } else {
            return sections
        }
    }

    const updateOrder = (main,name,order,direction) => {

        let CvCopy = {...Cv}
        const max = CvCopy.preference.order[main].length - 1
        let nextOrder = 0

        if(direction=="down"){
            if((order + 1) > max){ return false }else{ nextOrder = order + 1 }
        }else{
            if((order - 1) < 0 ){ return false }else{ nextOrder = order - 1 }
        }

        CvCopy.preference.order[main] = CvCopy.preference.order[main].map((elm,key)=>{
            if(elm.order == nextOrder){
                elm.order = order
            }
            if(elm.name == name){
                elm.order = nextOrder
            }
            return elm
        })

        updateCv(CvCopy)

    }

    const setActiveSections = (name) =>{
        setActiveSection(name)
    }

    useDebounced(()=>{
        scroller.scrollTo(activeSection, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    },[activeSection],1200)

    const getActiveSection = () =>{
        return Cv?.preference?.activeSection;
    }


    const setActivationForSection = (name,status) => {
         let CopyCv = {...Cv}
         CopyCv.preference.activeSection[name] = status;
         updateCv(CopyCv);
    }

    const getForms = (sections) => {

        sections = sortSections(sections)

        let showSections = getActiveSection()

        console.log("active sec",activeSection)

        return sections.map((section, keys) => {
            if (section.active == true) {
            
                return (
                  
                    <Element name={section.name}> 
                     {  
                         React.cloneElement(section.component, {
                            mode: "input",
                            index: keys,
                            key: keys,
                            name: section.name,
                            inputDataModel: Cv.data,
                            active:activeSection,
                            show:showSections[section.name],
                            removeSection:(name)=>{
                                setActivationForSection(name,false)
                            },
                            scrollTo:(name)=>{
                                setActiveSections(name)
                            },
                            updateOrder: (main, name, order, direction) => {
                                updateOrder(main, name, order, direction);
                            },
                            updateModel: (sections, updateModel) => {
                                updateMainDataModel(sections, updateModel);
                            },
                        })  }
                    </Element>

                )
            } else {
                return null;
            }
        });
    };
    


    const getActivationButton = (sections) => {

        let activeSection = getActiveSection()

        return sections.map((section, keys) => {

            if (section.active == true) {
                return  !activeSection[section.name] && <Paper className="activation_button"> <L>{section.fullName}</L>  <PlusCircle className="activation_icone" onClick={()=>setActivationForSection(section.name,true)} /> </Paper> 
            } else {
                return null;
            }
        });
    };

    

    const download = () => {
        if (UrlDownload != "") {
            var file_path = UrlDownload;
            var a = document.createElement("A");
            a.href = file_path;
            a.download = props.currentCv.libelle + ".pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const toogleFullScreen = () => {
        setFullScreen(!FullScreen)
        if(FullScreen){
            setCvzoom("1")
        }else{
            setCvzoom("1.4")
        }
    }

    const zoom = (type) =>{
          if(type=="+"){
              if(parseFloat(cvzoom) + 0.2 < 4){
                   setCvzoom(parseFloat(cvzoom) + 0.2)
              }
          }else{
              if(parseFloat(cvzoom) - 0.2 > 0.2){
                  setCvzoom(parseFloat(cvzoom) - 0.2)
              }
          }
    }

    const chkData = () => {

        if (typeof DebouncedCv == "undefined") return false;

        if (
            Object.entries(DebouncedCv ? DebouncedCv : []).length != 0
        ) {
            return true;
        }
        return false;
    };

    return (
        <>


            <Row>


                <button

                    onClick={() => {
                        toogleFullScreen();
                    }}
                    className={
                        "side_button"
                    }
                >
                    { !FullScreen && <Fullscreen size={30} color="#006eb7"/> }
                    { FullScreen && <FullscreenExit size={30} color="#006eb7"/> }
                </button>

                <button
                    title={"Preference"}

                    onClick={() => {
                        getPreferences();
                    }}
                    className={
                        "prefrence " + PrefButtonClass + (PrefStatus ? " openPref" : "")
                    }
                >
                    <Gear size={30} color="#006eb7"/>
                </button>

                <button
                    title={"Download"}

                    onClick={() => {
                        download();
                    }}
                    className={
                        "download " + PrefButtonClass + (PrefStatus ? " openPref" : "")
                    }
                >
                    <Download size={30} color="#006eb7"/>
                </button>

                <div className={"zoom_hub"}>
                    <button
                        title={"Zoom +"}
                        onClick={() => {
                           zoom("+");
                        }}
                        className={
                            "zoom_button"
                        }
                    >
                        <ZoomIn size={20} color="#006eb7"/>
                    </button>

                    <button
                        title={"Zoom -"}
                        onClick={() => {
                            zoom("-");
                        }}
                        className={
                            "zoom_button"
                        }
                    >
                        <ZoomOut size={20} color="#006eb7"/>
                    </button>
                </div>
                <div className="mobileHub">
                    <button
                        onClick={() => {
                            getPreferences();
                        }}
                        className={"mobil-download-button"}
                    >
                        <Gear size={30} color="#006eb7"/>
                    </button>

                    <button
                        onClick={() => {
                            download();
                        }}
                        className={"mobil-download-button"}
                    >
                        <Download size={30} color="#006eb7"/>
                    </button>

                    <button
                        onClick={() => {
                            toggle();
                        }}
                        className={"mobil-download-button pill-right toggle_display"}
                    >

                        {!toggleDisplay && <FilePost size={30} color="#006eb7"/> }
                        {toggleDisplay && <UiChecks size={30} color="#006eb7"/> }
                    </button>
                </div>
                { !FullScreen && <Col className={ "fullColHeigth infoForms "  + (toggleDisplay ? "alternHidden" : "" ) } lg="6" >

                    {PrefStatus && <PreferenceBare
                        updateCurrentCv={(cv) => updateCurrentCv(cv)}
                        closePref={() => {
                            setPrefStatus(false);
                        }}
                        currentCv={Cv}
                        status={PrefStatus}
                    />
                    }

                    {chkData() == true && !PrefStatus && (
                        <div>
                          <div> {getForms(Sections)} </div>
                          <div className="activation_button_container"> {getActivationButton(Sections)} </div>
                         </div>
                    )}

                </Col> }
                <Col
                    onMouseOver={() =>
                        setPrefButtonClass("prefrences-button  mouse-over-pdf")
                    }
                    onMouseLeave={() => setPrefButtonClass("prefrences-button")}
                    className={"fullColHeigth renderView " +  (toggleDisplay ? "" : "alternHidden" )}
                     lg={ FullScreen ? "12" : "6" }
                >
                    {chkData() == true && (
                        <PdfViewer
                            setUrlDownload={(UrlDownload) => setUrlDownload(UrlDownload)}
                            scale={cvzoom}
                            lang={Langage}
                            PdfData={DebouncedCv}
                        />
                    )}
                </Col>
            </Row>
        </>
    );
};

export default Templating;
