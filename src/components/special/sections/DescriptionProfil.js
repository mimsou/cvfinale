import React, {  useEffect, useState } from "react";
import {
  Col,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
} from "reactstrap";
import {
  ArrowDownLeftSquare,
  ArrowUpRightSquare,
  DashCircle,
 
} from "react-bootstrap-icons";
import "@dsalvagni/react-profile-picture/build/ProfilePicture.css";
import TextEditor from "../Helper-component/TextEditor";
import L from "../../../locale";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const DescriptionProfil = (props) => {

  useEffect(() => {}, []);

  const style = {
    bgItem: {
      backgroundColor: "#FFFFFF",
    },
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [Collapsed, setCollapsed] = useState(true);

  const [DataModel, setDataModel] = useState(props.inputDataModel?.descriptionProfil ? props.inputDataModel?.descriptionProfil : "");
  
  const [DataModelInput, setDataModelInput] = useState(props.inputDataModel?.descriptionProfil ? props.inputDataModel?.descriptionProfil : "");

 
  const handleInputChange = (events) => {
    const target = events.nativeEvent.target;
    const values = target.type === "checkbox" ? target.checked : target.value;
    setDataModel(values);
    props.updateModel("descriptionProfil", values);
  };


  useEffect(() => {
     if(typeof props.inputDataModel?.descriptionProfil != "undefined"){
       setDataModelInput(props.inputDataModel["descriptionProfil"])
     }
  },[]);

  useEffect(() => {
    setDataModelInput(DataModel)
  }, [DataModel]);


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
      <div  style={props.show ? {} : { display:"none" } }  className="MainSectionWarp">
      <Accordion flush expanded={!Collapsed} onChange={(e,expanded)=>setCollapsed(!expanded)} style={style.bgItem}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className="SectionHeading" >
      <DashCircle className="remove_section_cione" onClick={(e)=>{e.stopPropagation() ;props.removeSection(props.name);}}  /> <L>Présentation générale</L>  
        </AccordionSummary>
        {!Collapsed && (
          <AccordionDetails>
            <Row>
              <Col md={12}>
                 
                <TextEditor label={<L>Présentation générale</L>} name="desciprionprofile" value={DataModel} onChange={handleInputChange} />

              </Col>
            </Row>
          </AccordionDetails>
        )}
      </Accordion>
      </div>
    );

    return <></>;
  } else {
    return <></>;
  }
};

export default DescriptionProfil;
