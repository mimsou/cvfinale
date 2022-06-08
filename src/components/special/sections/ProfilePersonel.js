import React, {  useEffect, useState, useRef } from "react";
import {
  Col,
  Input,
  Label,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import {
  ArrowDownLeftSquare,
  ArrowUpRightSquare,
  DashCircle,
} from "react-bootstrap-icons";
import L from "../../../locale";
import ProfilePicture from "@dsalvagni/react-profile-picture";
import "@dsalvagni/react-profile-picture/build/ProfilePicture.css";
import data from "../../../model/data";
import preference from "../../../model/preference";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProfilPersonel = (props) => {

  useEffect(() => {}, []);
  
  const style = {
    bgItem: {
      backgroundColor: "#FFFFFF",
    },
  };

  const [AvatarImg, setAvatarImg] = useState(
      props.inputDataModel?.avatarImage ? props.inputDataModel?.avatarImage :
    "data:image/png;base64,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"
  );

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [AvatarImgOrigine, setAvatarImgOrigine] = useState();

  const [Collapsed, setCollapsed] = useState(false);

  const resizeImage = (base64Str, maxWidth = 400, maxHeight = 350) => {
    return new Promise((resolve) => {
      let img = new Image();
      img.src = base64Str;
      img.onload = () => {
        let canvas = document.createElement("canvas");
        const MAX_WIDTH = maxWidth;
        const MAX_HEIGHT = maxHeight;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
    });
  };

  const [DataModel, setDataModel] = useState(props.inputDataModel?.profilePersonel ? props.inputDataModel?.profilePersonel : data.profilePersonel);

  const [DataModelinput, setDataModelinput] = useState(props.inputDataModel?.profilePersonel ? props.inputDataModel?.profilePersonel : data.profilePersonel);

  let profilePictureRef = "";

  const handleInputChange = (events) => {
    const target = events.nativeEvent.target;
    const values = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const newobj = JSON.parse(JSON.stringify(DataModelinput));
    newobj[name].value = values;
    setDataModel(newobj);
    props.updateModel("profilePersonel", newobj);
     
  };

  const handleUpload = () => {
    const PP = profilePictureRef.current;
    const imageData = PP.getData();
    const file = imageData.file;
    const imageAsDataURL = PP.getImageAsDataUrl();
    setAvatarImg(imageAsDataURL);
  };

  profilePictureRef = useRef();

  useEffect(() => {
    props.updateModel("avatarImage", AvatarImg);
  }, [AvatarImg]);

  useEffect(() => {
    setDataModelinput(DataModel)
  }, [DataModel]);

  useEffect(() => {
     if(typeof props.inputDataModel?.profilePersonel != "undefined" ){
      setDataModelinput(props.inputDataModel["profilePersonel"]) 
     }
  },[]);


  useEffect(() => {
    if (!Collapsed) {
      props.scrollTo(props.name)
    }
  }, [Collapsed]);

  useEffect(() => {
    if(props.active != props.name){
      setCollapsed(true)
    }
  }, [props.active]);

  if (props.mode == "render") {
    return <></>;
  } else if (props.mode == "input") {
    return (
      <div style={props.show ? {} : { display:"none" } } className="MainSectionWarp">
      <Accordion flush expanded={!Collapsed} onChange={(e,expanded)=>setCollapsed(!expanded)} style={style.bgItem}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="SectionHeading" >
          <L>Donnée personelle</L> 
        </AccordionSummary>
        
          <AccordionDetails>
            <Row>
              <Col md={12}>
                <Row>
                  <Col md={6}  xs={12}  className={"offset-md-5 offset-xs-6"}  >
                    <div className={"avatar_img_container"}>
                          <img
                        onClick={() => {
                          setModal(true);
                        }}
                        className={"avatar_img"}
                        width={120}
                        height={120}
                        src={AvatarImg}
                      />
                    </div>
                </Col>
                  </Row>
                  <Row>
                <Col md={12}>
                <Label className="form-control-sm" for="description" sm={12}>
                  <L>Déscription du profil</L>
                  </Label>
                  <Input

                    value={DataModel.description.value}
                    onChange={handleInputChange}
                    className="form-control-sm"
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Profil"
                  />
                </Col>
                </Row>
                <Modal
                  onOpened={()=>{ setAvatarImgOrigine(AvatarImgOrigine)}}
                  style={{ top: "50px" }}
                  isOpen={modal}
                  toggle={toggle}
                  className={""}
                >
                  <ModalHeader toggle={toggle}>  <L>Ajouter une photo</L></ModalHeader>
                  <ModalBody>
                    <ProfilePicture
                      
                      onImageLoaded={(e) => {
                        resizeImage(e.data.imageSrc.currentSrc, 600, 400).then((result) => {
                          setAvatarImgOrigine(result);
                        });
                      }}
                      image={AvatarImgOrigine}
                      ref={profilePictureRef}
                      useHelper={true}
                      debug={false}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() => {
                        handleUpload();
                        toggle();
                      }}
                    >
                      <L>Ajouter</L>
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                      <L>Annuler</L>
                    </Button>
                  </ModalFooter>
                </Modal>
              </Col>

              <Col md={12}>
                <Row>
                <Col sm={6}>
                <Label className="form-control-sm" for="Prénom" sm={12}>
                  <L>Prénom</L>
                  </Label>
                  <Input
                    value={DataModel.prenom.value}
                    onChange={handleInputChange}
                    className="form-control-sm"
                    type="text"
                    name="prenom"
                    id="prenom"
                    placeholder="Prénom"
                  />
                </Col>
                <Col sm={6}>
                <Label className="form-control-sm" for="nom" sm={12}>
                  <L>Nom de famille</L>
                  </Label>
                  <Input
                    value={DataModel.nom.value}
                    onChange={handleInputChange}
                    className="form-control-sm"
                    type="text"
                    name="nom"
                    id="nom"
                    placeholder="Nom de famaille"
                  />
                </Col>

                <Col sm={12}>
                  <Label className="form-control-sm" for="datenainssance" sm={12}>
                    <L>Date de naissance</L>
                  </Label>
                  <Input
                    value={DataModel.datenainssance.value}
                    onChange={handleInputChange}
                    className="form-control-sm"
                    type="date"
                    name="datenainssance"
                    id="datenainssance"
                    placeholder="Date de naissance"
                  />
                </Col>
                 
                <Col sm={6}>
                  <Label className="form-control-sm" for="email" sm={12}>
                    <L>E-mail</L>
                  </Label>
                  <Input
                    value={DataModel.email.value}
                    onChange={handleInputChange}
                    className="form-control-sm"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                  />
                </Col>
                <Col sm={6}>

                  <Label className="form-control-sm" for="telephone" sm={12}>
                    <L>Numéro de téléphone</L>
                  </Label>

                  <Input

                    value={DataModel.telephone.value}
                    onChange={handleInputChange}
                    className="form-control-sm"
                    type="text"
                    name="telephone"
                    id="telephone"
                    placeholder="Telephone"
                  />

                </Col>
                <Col sm={6}>
                  <Label className="form-control-sm" for="adresse" sm={12}>
                    <L>Adresse</L>
                  </Label>
                  <Input
                    value={DataModel.adress.value}
                    onChange={handleInputChange}
                    className="form-control-sm"
                    type="text"
                    name="adress"
                    id="adress"
                    placeholder="Adresse"
                  />
                </Col>
                  <Col sm={6}>
                    <Label className="form-control-sm" for="adresse" sm={12}>
                      <L>Pays</L>
                    </Label>
                    <Input
                        value={DataModel.pay.value}
                        onChange={handleInputChange}
                        className="form-control-sm"
                        type="text"
                        name="pay"
                        id="pay"
                        placeholder="Adresse"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </AccordionDetails>
      
      </Accordion>
      </div>
    );

    return <></>;
  } else {
    return <></>;
  }
};

export default ProfilPersonel;
