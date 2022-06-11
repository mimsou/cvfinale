import React, {useEffect, useState} from "react";
import "../../../src/assets/css/index.css";
import "../../../src/assets/css/base.css";
import userService from "services/user.service";
import {
    Button,
    Container,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input
} from "reactstrap";
import CvsThumbnail from "components/special/CvsThumbnail";
import {Add} from "@mui/icons-material";
import L from "../../locale";
import data from "../../model/data"
import preference from "../../model/preference"
import { Dialog } from "@mui/material";
import Slide from '@mui/material/Slide';


const UserInformaion = (props) => {

    const [AllMyCvs, setAllMyCvs] = useState([]);
    const [modal, setModal] = useState(false);
    const [Libelle, setLibelle] = useState("");
    const [CvMode, setCvMode] = useState("");

    const toggle = () => setModal(!modal);

    useEffect(() => {
        userService.getAllCvs().then((response) => {
            var datas = response.data.map((elm) => {
                const pref = {...preference}
                let bindedObjectPref = Object.assign(pref , elm.preference  )
                elm.preference = bindedObjectPref;
                const datas = {...data}
                let bindedObjectData = Object.assign(datas  , elm.data )
                elm.data = bindedObjectData;
                return elm
            })
            setAllMyCvs(datas);
        });
    }, []);

    const getAllCvs = () => {
        userService.getAllCvs().then((response) => {
            var datas = response.data.map((elm) => {
                const pref = {...preference}
                let bindedObjectPref = Object.assign(pref , elm.preference  )
                elm.preference = bindedObjectPref;
                const datas = {...data}
                let bindedObjectData = Object.assign(datas  , elm.data )
                elm.data = bindedObjectData;
                return elm
             })
            setAllMyCvs(datas);
        });
    }

    const getCvsThumbnail = () => {
        return AllMyCvs.map((cv, keys) => {
            return (
                <CvsThumbnail
                    refrech={()=>getAllCvs()}
                    key={keys}
                    onClick={() => {
                        props.editCv(cv);
                    }}
                    style={{width: "178px", height: "252px"}}
                    dataModel={cv}
                />
            );
        });
    };

    const newLibelle = () => {
        setModal(true)
    }

    const PreferenceSetMode = (PreferenceSetMode,mode) =>{
         let prefCopy = {...PreferenceSetMode}
         if(mode=="et"){
            prefCopy.activeSection = {
                ProfilePersonel:true,
                DescriptionProfil:true,
                Fromations:false,
                ExperienceProfessionel:false,
                Stage:false,
                Competances:true,
                Langue:true,
                CentreInteret:true
            }
         }else if(mode=="pe"){
            prefCopy.activeSection = {
                ProfilePersonel:true,
                DescriptionProfil:true,
                Fromations:true,
                ExperienceProfessionel:false,
                Stage:true,
                Competances:true,
                Langue:true,
                CentreInteret:true
            }
         }else if(mode=="pf"){
            prefCopy.activeSection = {
                ProfilePersonel:true,
                DescriptionProfil:true,
                Fromations:true,
                ExperienceProfessionel:true,
                Stage:true,
                Competances:true,
                Langue:true,
                CentreInteret:true
            }
         }
         return prefCopy;
    }

    const newCv = (mode) => {

        var param = {}

        const Updatedpreferences =  PreferenceSetMode(preference,mode)

        let dataFixture = JSON.stringify(data)
        let preferenceFixture = JSON.stringify(Updatedpreferences)
        props.setModes(mode)
        if(Libelle.target?.value){
        userService.createUserCv(dataFixture, preferenceFixture, Libelle.target.value).then((reponse) => {
            let cv = reponse.data
            cv.data = JSON.parse(cv.data)
            cv.preference = JSON.parse(cv.preference)
            props.editCv(reponse.data);
        });
       }else{
           alert("Libelle vide")
       }
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <div className="page-title"><L>Gestion des CV</L></div>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-start",
                                flexWrap: "wrap"
                            }}
                        >
                            {getCvsThumbnail()}

                            <div className="ButtonContainer">
                                <div
                                    onClick={() => {
                                        newLibelle();
                                    }}
                                    className="addCvButton Thumnailcontainer"
                                >
                                    <Add
                                        stroke={"#006eb7"}
                                        fill={"red"}
                                        height={55}
                                        width={55}
                                        className="icone-center"
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>

                         <Modal size="xl"  id={"createCv"} centered={true} isOpen={modal} toggle={toggle} className={"createCv"}>
                            <ModalHeader toggle={toggle}>Nouveau CV</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col>
                                         
                                    </Col>
                                </Row>
                                Titre : <Input className="cv_new_title" onChange={(e) => setLibelle(e)}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button  outline className="selection_button" color="secondary" onClick={() => {
                                    toggle();
                                    newCv("et")
                                }}>
                                   Créer un cv pour un étudiant
                                </Button>{" "}

                                <Button  outline className="selection_button" color="secondary" onClick={() => {
                                    toggle();
                                    newCv("pe")
                                }}>
                                   Créer un cv pour premier emploi
                                </Button>{" "}


                                <Button  outline className="selection_button" color="secondary" onClick={() => {
                                    toggle();
                                    newCv("pf")
                                }}>
                                   Créer un cv pour proffessionel avec expérience
                                </Button>{" "}

                             
                                
                            </ModalFooter>
                        </Modal>



                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UserInformaion;
