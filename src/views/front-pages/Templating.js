import React, { useContext, useEffect, useState } from "react";
import "../../../src/assets/css/index.css";
import "../../../src/assets/css/base.css";
import Sections from "components/special/sections/Sections";
import userService from "services/user.service";
import { Button, Col, Container, ListGroup, Row ,Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,} from "reactstrap";
import PdfViewer from "components/special/Pdf-render/PdfViewer";
import PreferenceBare from "components/special/PreferenceBare";
import {
  Download,
  Gear,
  FilePost,
  UiChecks,
  Fullscreen,
  FullscreenExit,
  ZoomIn,
  ZoomOut,
  NodePlus,
  PlusCircle,
} from "react-bootstrap-icons";
import { getPreference } from "hooks/preferences";
import convertPdfToImages from "components/special/Helper-component/PdfAsImage";
import { useHistory } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounced";
import { LanguageContext } from "../../localeContext";
import ProfilePersonel from "../../components/special/sections/ProfilePersonel";
import DescriptionProfil from "../../components/special/sections/DescriptionProfil";
import Fromations from "../../components/special/sections/Fromations";
import ExperienceProfessionel from "../../components/special/sections/ExperienceProfessionel";
import Stages from "../../components/special/sections/Stages";
import Competances from "../../components/special/sections/Competances";
import Langue from "../../components/special/sections/Langue";
import CentreInteret from "../../components/special/sections/CentreInteret";
import { Element, scroller } from "react-scroll";
import { Accordion, Paper } from "@mui/material";
import { Adsense } from "@ctrl/react-adsense";
import L from "locale";
import { usePageTracking } from "hooks/usePageTracking";



const Templating = (props) => {
  const [Tik, setTik] = useState(0);
  const [PrefStatus, setPrefStatus] = useState(true);
  const [Cv, updateCv] = useState(props?.currentCv ? props?.currentCv : null);
  const [DebouncedCv, setDebouncedCv] = useState();
  const [PrefButtonClass, setPrefButtonClass] = useState("prefrences-button");
  const [UrlDownload, setUrlDownload] = useState("");
  const history = useHistory();
  const [toggleDisplay, setToggleDispay] = useState(false);
  const [FullScreen, setFullScreen] = useState(false);
  const [activeSection, setActiveSection] = useState("ProfilePersonel");
  const [cvzoom, setCvzoom] = useState(1);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(<div></div>);
  const toggleModal = () => setModal(!modal);
  let Tracker = usePageTracking();



  const toggle = () => {
    setToggleDispay(!toggleDisplay);
    if (toggleDisplay == true) {
      setCvzoom("1");
    } else {
      setCvzoom("0.5");
    }
  };

  const [Langage, setLang] = useContext(LanguageContext);




  useEffect(() => {

    window.ele = document.getElementById('renderView');
    window.pos = { top: 0, left: 0, x: 0, y: 0 };
    window.ele.addEventListener('mousedown', mouseDownHandler);
 

    document.body.style.backgroundColor = "#f3f2ef";

    if (typeof props.currentCv != "undefined") {
      if (Object.entries(props.currentCv).length > 0) {
        updateCv(props.currentCv);
      } else {
        history.push("/app/user-information");
      }
    }


    fetchJsFromCDN('https://www.ezojs.com/ezoic/sa.min.js', ['ezstandalone']).then(([ezstandalone]) => {
      ezstandalone.define(131,132);
        if (!ezstandalone.enabled) {
          ezstandalone.enable();
          ezstandalone.display();
        }
        else {
          ezstandalone.refresh();
        }
      }) 

    window.addEventListener("resize", resize);

    const int = setInterval(() => {
      setTik((Tik) => Tik + 1);
    }, 10000);
    return () => {
      clearInterval(int);
      window.removeEventListener("resize", resize);
    };
  }, []);




  const mouseDownHandler = function (e) {
    window.pos = {
        // The current scroll
        left:  window.ele.scrollLeft,
        top:  window.ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    window.ele.style.cursor = 'grabbing';
    window.ele.style.userSelect = 'none';

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};


const mouseMoveHandler = function (e) {
  // How far the mouse has been moved
  const dx = e.clientX -  window.pos.x;
  const dy = e.clientY -  window.pos.y;

  // Scroll the element
  window.ele.scrollTop =  window.pos.top - dy;
  window.ele.scrollLeft =  window.pos.left - dx;
};

const mouseUpHandler = function () {
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);

  window.ele.style.cursor = 'grab';
  window.ele.style.removeProperty('user-select');
};

  const fetchJsFromCDN = (src, externals = []) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.setAttribute("src", src);
      script.addEventListener("load", () => {
        resolve(
          externals.map((key) => {
            const ext = window[key];
            typeof ext === "undefined" &&
              console.warn(`No external named '${key}' in window`);
            return ext;
          })
        );
      });
      script.addEventListener("error", reject);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (!Cv?.preference?.order) {
      if (Cv?.preference) {
        let CvCopy = { ...Cv };
        CvCopy.preference.order = {
          profile: [
            { name: "ProfilePersonel", order: 0 },
            { name: "DescriptionProfil", order: 1 },
          ],
          bigBlok: [
            { name: "Fromations", order: 0 },
            { name: "ExperienceProfessionel", order: 2 },
            { name: "Stage", order: 1 },
          ],
          Blok: [
            { name: "Competances", order: 0 },
            { name: "Langue", order: 1 },
            { name: "CentreInteret", order: 2 },
          ],
        };
        updateCv(CvCopy);
      }
    }
  }, [Cv]);

  const resize = (e) => {
    if (window.innerWidth < 991) {
      setFullScreen(false);
    }
  };

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
    let CvCopy = { ...Cv };
    CvCopy.data[sections] = data;
    updateCurrentCv(CvCopy);
  };

  const updateCurrentCv = (cv) => {
    updateCv(cv);
  };

  useDebounced(
    () => {
      if (typeof Cv != "undefined") {
        setDebouncedCv(Cv);
      }
    },
    [Cv],
    1000
  );

  useDebounced(
    () => {
      if (
        typeof props.currentCv?.id != "undefined" &&
        Object.keys(Cv ? Cv : []).length !== 0
      ) {
        if (UrlDownload) {
          convertPdfToImages(UrlDownload).then((thumbnail) => {
            const pref = { ...Cv.preference, thumb: thumbnail };
            userService.updateUserCv(Cv.data, pref, props.currentCv.id);
            window.gtag("event", "Mise à jour CV"); 
          });
        }
      }
    },
    [UrlDownload],
    3000
  );

  const getPreferences = () => {
    setPrefStatus(true);
    window.gtag("event", "Affichage préférences"); 
  };

  const sortSections = (sections) => {
    let sortedSection = [];
    let order = Cv?.preference?.order;
    if (order) {
      sections.forEach((elm) => {
        order.profile.forEach((ordc) => {
          if (elm.name == ordc.name) {
            sortedSection[ordc.order] = elm;
          }
        });
        order.bigBlok.forEach((orda) => {
          if (elm.name == orda.name) {
            sortedSection[orda.order + 2] = elm;
          }
        });
        order.Blok.forEach((ordb) => {
          if (elm.name == ordb.name) {
            sortedSection[ordb.order + 6] = elm;
          }
        });
      });
      return sortedSection;
    } else {
      return sections;
    }
  };

  const updateOrder = (main, name, order, direction) => {
    let CvCopy = { ...Cv };
    const max = CvCopy.preference.order[main].length - 1;
    let nextOrder = 0;

    if (direction == "down") {
      if (order + 1 > max) {
        return false;
      } else {
        nextOrder = order + 1;
      }
    } else {
      if (order - 1 < 0) {
        return false;
      } else {
        nextOrder = order - 1;
      }
    }

    CvCopy.preference.order[main] = CvCopy.preference.order[main].map(
      (elm, key) => {
        if (elm.order == nextOrder) {
          elm.order = order;
        }
        if (elm.name == name) {
          elm.order = nextOrder;
        }
        return elm;
      }
    );

    updateCv(CvCopy);
  };

  const setActiveSections = (name) => {
    setActiveSection(name);
  };

  useDebounced(
    () => {
      scroller.scrollTo(activeSection, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    },
    [activeSection],
    1200
  );

  const getActiveSection = () => {
    return Cv?.preference?.activeSection;
  };

  const setActivationForSection = (name, status) => {
    let CopyCv = { ...Cv };
    CopyCv.preference.activeSection[name] = status;
    updateCv(CopyCv);
  };

  const setSectionPosition = (name, pos) => {
    let CopyCv = { ...Cv };
    CopyCv.preference.sectionPostion[name] = pos;
    updateCv(CopyCv);
  };

  const checkFormData = (name, data) => {

    var msg = [];
  
    if (data.poste) {
      if (data.poste.value.trim() == "") {
        msg.push(<div>Le titre du poste doit étre indiquer </div>);
      }
    }

    if (data.formation) {
      if (data.formation.value.trim() == "") {
        msg.push(<div>Le titre est obligatoire</div>);
      }
    }

    if(data.datedebut){
      if (String(data.datedebut.value.anne).trim() == "" ) {
        msg.push(<div>Il faut indiquer au moin l'année pour la date</div>);
      }
    }


    if (data.libelle) {
      if (data.libelle.value.trim() == "") {
        msg.push(<div> Le titre est obligatoire </div>);
      }
    }
    

    if (msg.length != 0) {
      window.gtag("event", "Erreur:Champ obligatoire"); 
      setMessage(msg);
      setModal(true);
      return false
    }
   
    return true
  };

  const getModalMsg = () => {
    return message;
  };

  const getForms = (sections) => {
    sections = sortSections(sections);

    let showSections = getActiveSection();

    return sections.map((section, keys) => {
      if (section.active == true) {
        return (
          <Element name={section.name}>
            {React.cloneElement(section.component, {
              mode: "input",
              index: keys,
              key: keys,
              name: section.name,
              position: Cv?.preference?.sectionPostion[section.name],
              inputDataModel: Cv.data,
              checkData: (name, data) => {
               return checkFormData(name, data);
              },
              active: activeSection,
              show: showSections[section.name],
              setSectionPosition: (name, pos) => {
                setSectionPosition(name, pos);
              },
              removeSection: (name) => {
                setActivationForSection(name, false);
              },
              scrollTo: (name) => {
                setActiveSections(name);
              },
              updateOrder: (main, name, order, direction) => {
                updateOrder(main, name, order, direction);
              },
              updateModel: (sections, updateModel) => {
                updateMainDataModel(sections, updateModel);
              },
            })}
          </Element>
        );
      } else {
        return null;
      }
    });
  };

  const getActivationButton = (sections) => {
    let activeSection = getActiveSection();

    return sections.map((section, keys) => {
      if (section.active == true) {
        return (
          !activeSection[section.name] && (
            <Paper className="activation_button">
              {" "}
              <L>{section.fullName}</L>{" "}
              <PlusCircle
                className="activation_icone"
                onClick={() => setActivationForSection(section.name, true)}
              />{" "}
            </Paper>
          )
        );
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
      window.gtag("event", "Download CV"); 
    }
  };

  const toogleFullScreen = () => {
    setFullScreen(!FullScreen);
    if (FullScreen) {
      setCvzoom("1");
    } else {
      setCvzoom("1.4");
    }
    window.gtag("event", "Affichage CV en plein ecran"); 
  };

  const zoom = (type) => {
    if (type == "+") {
      if (parseFloat(cvzoom) + 0.2 < 4) {
        setCvzoom(parseFloat(cvzoom) + 0.2);
      }
    } else {
      if (parseFloat(cvzoom) - 0.2 > 0.2) {
        setCvzoom(parseFloat(cvzoom) - 0.2);
      }
    }
  };

  const chkData = () => {
    if (typeof DebouncedCv == "undefined") return false;

    if (Object.entries(DebouncedCv ? DebouncedCv : []).length != 0) {
      return true;
    }
    return false;
  };

  return (
    <>
     <div class="center_add">
           <div id="ezoic-pub-ad-placeholder-131"> </div>
        </div>
      <Row>
        <button
          onClick={() => {
            toogleFullScreen();
          }}
          className={"side_button"}
        >
          {!FullScreen && <Fullscreen size={30} color="#006eb7" />}
          {FullScreen && <FullscreenExit size={30} color="#006eb7" />}
        </button>

        {/* <button
          title={"Preference"}
          onClick={() => {
            getPreferences();
          }}
          className={
            "prefrence " + PrefButtonClass + (PrefStatus ? " openPref" : "")
          }
        >
          <Gear size={30} color="#006eb7" />
        </button> */}

        <button
          title={"Download"}
          onClick={() => {
            download();
          }}
          className={
            "download " + PrefButtonClass + (PrefStatus ? " openPref" : "")
          }
        >
          <Download size={30} color="#006eb7" />
        </button>

        <div className={"zoom_hub"}>
          <button
            title={"Zoom +"}
            onClick={() => {
              zoom("+");
            }}
            className={"zoom_button"}
          >
            <ZoomIn size={20} color="#006eb7" />
          </button>

          <button
            title={"Zoom -"}
            onClick={() => {
              zoom("-");
            }}
            className={"zoom_button"}
          >
            <ZoomOut size={20} color="#006eb7" />
          </button>
        </div>



        <div className="mobileHub">
          <div>
          {/* <button
            onClick={() => {
              getPreferences();
            }}
            className={"mobil-download-button screenHub"}
          >
            <Gear size={30} color="#006eb7" />
          </button> */}

          <button
            onClick={() => {
              download();
            }}
            className={"mobil-download-button"}
          >
            <Download size={30} color="#006eb7" />
          </button>
          <div className="toggle_description">
            <L>
              {toggleDisplay && "Formulaire"} {!toggleDisplay && "Visoneur"}
            </L>{" "}
            >{" "}
          </div>
          <button
            onClick={() => {
              toggle();
            }}
            className={"mobil-download-button pill-right toggle_display"}
          >
            {!toggleDisplay && <FilePost size={30} color="#006eb7" />}
            {toggleDisplay && <UiChecks size={30} color="#006eb7" />}
          </button>

          {toggleDisplay && (
            <div className={"zoom_hub_mobile"}>
              <button
                title={"Zoom +"}
                onClick={() => {
                  zoom("+");
                }}
                className={"zoom_button"}
              >
                <ZoomIn size={20} color="#006eb7" />
              </button>

              <button
                title={"Zoom -"}
                onClick={() => {
                  zoom("-");
                }}
                className={"zoom_button"}
              >
                <ZoomOut size={20} color="#006eb7" />
              </button>
            </div>
          )}
          </div>

          {toggleDisplay && (<div>
            <PreferenceBare
                updateCurrentCv={(cv) => updateCurrentCv(cv)}
                closePref={() => {
                  setPrefStatus(false);
                }}
                currentCv={Cv}
                status={PrefStatus}
              />
          </div>)}
          
        </div>
        {!FullScreen && (
          <Col
            className={
              "fullColHeigth infoForms " + (toggleDisplay ? "alternHidden" : "")
            }
            lg="6"
          >
            {PrefStatus && (
              <PreferenceBare
                updateCurrentCv={(cv) => updateCurrentCv(cv)}
                closePref={() => {
                  setPrefStatus(false);
                }}
                currentCv={Cv}
                status={PrefStatus}
              />
            )}

            {chkData() == true  && (
              <div>
                <div> {getForms(Sections)} </div>
                <div className="activation_button_container">
                  {" "}
                  {getActivationButton(Sections)}{" "}
                </div>
              </div>
            )}
          </Col>
        )}
        <Col
          onMouseOver={() =>
            setPrefButtonClass("prefrences-button  mouse-over-pdf")
          }
          onMouseLeave={() => setPrefButtonClass("prefrences-button")}
          className={
            "fullColHeigth renderView " + (toggleDisplay ? "" : "alternHidden")
          }
          id="renderView"
          lg={FullScreen ? "12" : "6"}
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
        <Col>
          <Modal
            size="md"
            id={"getMessage"}
            centered={true}
            isOpen={modal}
            toggle={toggleModal}
            className={"createCv"}
          >
      
            <ModalBody> <div className="modal_text"> {getModalMsg()} </div> </ModalBody>
            <ModalFooter>

              <Button    outline  onClick={() => {
                  toggleModal();
                }} color="primary" > <L> Ok </L> </Button>

            </ModalFooter>
          </Modal>
        </Col>
      </Row>
      <div class="center_add">
           <div id="ezoic-pub-ad-placeholder-132"> </div>
        </div>
    </>
  );
};

export default Templating;
