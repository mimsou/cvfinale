import React, {  useEffect, useState, useRef } from "react";
import {
  Col,
  Input,
  Label,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  Button,
} from "reactstrap";
import DatePicker from "../Helper-component/DatePicker";
import {
  ArrowDownLeftSquare,
  ArrowUpRightSquare,
  DashCircle,
} from "react-bootstrap-icons";
import L from "../../../locale";
import "@dsalvagni/react-profile-picture/build/ProfilePicture.css";
import SingleTitleItemViewer from "../Helper-component/SingleTitleItemViewer";
import TextEditor from "../Helper-component/TextEditor";
import OrderWidget from "../Helper-component/OrderWidget";
import {sortableContainer, sortableElement} from "react-sortable-hoc";
import {arrayMoveImmutable} from "array-move";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PositionWidget from "../Helper-component/PositionWidget";

const Fromations = (props) => {
  const jsonCopy = (src) => {
    return JSON.parse(JSON.stringify(src));
  };

  const style = {
    bgItem: {
      backgroundColor: "#FFFFFF",
    },
  };

  const [Collapsed, setCollapsed] = useState(true);

  const [IdCollection, setIdCollection] = useState(0);

  const [UpdateMode, setUpdateMode] = useState(false);

  const year = new Date().getFullYear();

  const [DataModelReset, setDataModelReset] = useState({
    formation: { active: true, value: "" },
    institue: { active: true, value: "" },
    lieu: { active: true, value: "" },
    datedebut: { active: true, value: {mois:"01",anne:year} },
    datefin: { active: true, value: {mois:"01",anne:year} },
    description: { active: true, value: "" },
  });


  const [DataModel, setDataModel] = useState({
    formation: { active: true, value: "" },
    institue: { active: true, value: "" },
    lieu: { active: true, value: "" },
    datedebut: { active: true, value: {mois:"01",anne:year} },
    datefin: { active: true, value: {mois:"01",anne:year} },
    description: { active: true, value: "" },
  });

  const getNextIdCollection = () => {
    let newId = IdCollection + 1;
    setIdCollection(newId);
    return newId;
  };

  const [DataModelCollection, setDataModelCollection] = useState(props.inputDataModel?.formation ? props.inputDataModel?.formation : []);

  let profilePictureRef = "";

  const handleInputChange = (events) => {
    const target = events.nativeEvent.target;
    const values = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const newobj = JSON.parse(JSON.stringify(DataModel));
    newobj[name].value = values;
    setDataModel(newobj);
  };

  const handleDateChange = (name,values) => {

    const newobj = JSON.parse(JSON.stringify(DataModel));
    newobj[name].value = values;
    setDataModel(newobj);
  }

  const deleteItem = (selectedDataModel) => {

    let datacollectcopy = [...DataModelCollection];
    let objIndex = datacollectcopy.findIndex((obj => obj.id == selectedDataModel.id));
    datacollectcopy.splice(objIndex, 1)
    setDataModelCollection(datacollectcopy);
  }

  const handleUpload = () => {
    const PP = profilePictureRef.current;
    const imageData = PP.getData();
    const file = imageData.file;
    const imageAsDataURL = PP.getImageAsDataUrl();


    //add here the upload logic...
  };

  const addFormation = () => {
    if (!props.checkData(props.name,DataModel)) return false;
    if (!UpdateMode) {
      let datamodelcopy = jsonCopy(DataModel);
      let datacollectcopy = [...DataModelCollection];
      datamodelcopy.id = getNextIdCollection();
      datacollectcopy.push(datamodelcopy);
      setDataModelCollection(datacollectcopy);
    } else {
      let datamodelcopy = jsonCopy(DataModel);
      let datacollectcopy = [...DataModelCollection];
      let objIndex = datacollectcopy.findIndex((obj => obj.id == datamodelcopy.id));
      datacollectcopy[objIndex] = datamodelcopy;
      setDataModelCollection(datacollectcopy);
      setUpdateMode(false)
    }
    setDataModel(DataModelReset)
  };

  profilePictureRef = useRef();

  useEffect(() => {
    props.updateModel("formation", DataModelCollection);
  }, [DataModelCollection]);

  useEffect(() => {
    if(typeof props.inputDataModel?.formation != "undefined" ){
      setDataModelCollection(props.inputDataModel["formation"]) 
    }
 },[props.inputDataModel]);


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

  const SortableItem = sortableElement(({children}) => <li className={"sortable_item"}>{children}</li>);

  const SortableContainer = sortableContainer(({children}) => {
    return <ul className={"sortable_container"} >{children}</ul>;
  });

  const onSortEnd = ({oldIndex, newIndex}) => {
    if(oldIndex !== newIndex){
      setDataModelCollection(arrayMoveImmutable(DataModelCollection, oldIndex, newIndex))
    }
  };

  const getDataCollection = () => {
    return (<SortableContainer distance={1} onSortEnd={onSortEnd}>
      { DataModelCollection.map((data, key) => {
        return (
            <SortableItem

                index={key}
                items={DataModelCollection}
                key={key}>
              <SingleTitleItemViewer
                  val={data}
                  editElement={(datamodel) => {
                    setUpdateMode(true);
                    setDataModel(datamodel);
                  }}
                  deleteItem={(datamodel) => {
                    deleteItem(datamodel)
                  }}
                  key={key}
                  title={data.formation.value}
              />
            </SortableItem>
        )
      })
      }
    </SortableContainer>)
  }

  const [disableDate, setDateDisable] = useState(false);

  if (props.mode == "render") {
    return <></>;
  } else if (props.mode == "input") {
    return (
      <div style={props.show ? {} : { display:"none" } }  className="MainSectionWarp">
      <OrderWidget {...props} updateOrder={(main,name,order,direction)=>props.updateOrder(main,name,order,direction)} />
     <Accordion flush expanded={!Collapsed} onChange={(e,expanded)=>setCollapsed(!expanded)} style={style.bgItem}>
       
       <AccordionSummary expandIcon={<ExpandMoreIcon />} className="SectionHeading" >
         
          
       <DashCircle className="remove_section_cione" onClick={(e)=>{e.stopPropagation() ;props.removeSection(props.name);}}  />

       <PositionWidget className="position_widget_bloc" position={props.position}  setSectionPostion={(pos)=>{props.setSectionPosition(props.name,pos)}} />

           <L>Formations</L>  
        </AccordionSummary>
        {!Collapsed && (
          <AccordionDetails>
            <Row>
              <Col sm={12}>
                <Label className="form-control-sm" for="formation" sm={12}>
                  <L>Formation</L>
                </Label>
                <Input
                  value={DataModel.formation.value}
                  onChange={handleInputChange}
                  className="form-control-sm"
                  type="text"
                  name="formation"
                  id="formation"
                  placeholder="Titre de la formation"
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label className="form-control-sm" for="nom" sm={12}>
                  <L>Date début</L>
                </Label>
                <DatePicker key={1}  value={DataModel.datedebut.value}  name="datedebut" id="datedebut" onChange={(value)=>(handleDateChange("datedebut",value))}   />
              </Col>

              <Col md={6}>
                <Label className="form-control-sm" for="nom" sm={12}>
                  <L>Date fin</L>

                  <div style={{paddingLeft: "60px",display: "inline-block"}}> présent : <Input style={{marginLeft: "5px"}} type={"checkbox"}  onChange={(e)=>{
                    if(e.target.checked){
                      handleDateChange("datefin",{mois:"",anne:"Present"})
                      setDateDisable(true)
                    }else{
                      setDateDisable(false)
                    }
                  }} /> </div>


                </Label>
                <DatePicker disable={disableDate}  key={2} value={DataModel.datefin.value} name="datefin" id="datefin"  onChange={(value)=>(handleDateChange("datefin",value))} />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label className="form-control-sm" for="institue" sm={12}>
                  <L>Institut</L>
                </Label>
                <Input
                  value={DataModel.institue.value}
                  onChange={handleInputChange}
                  className="form-control-sm"
                  type="text"
                  name="institue"
                  id="institue"
                  placeholder="Institue"
                />
              </Col>
              <Col md={6}>
                <Label className="form-control-sm" for="lieu" sm={12}>
                  <L>Lieu</L>
                </Label>
                <Input
                  value={DataModel.lieu.value}
                  onChange={handleInputChange}
                  className="form-control-sm"
                  type="text"
                  name="lieu"
                  id="lieu"
                  placeholder="Lieu"
                />
              </Col>
            </Row>
            <Row>
            <Col  md={12}>
                 <TextEditor label="Description" name="description"  value={DataModel.description.value} onChange={handleInputChange} > </TextEditor>
              </Col>
            </Row>
            <Row>
              <Col
                md={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  onClick={() => {
                    addFormation();
                  }}
                  style={{ margin: "5px" }}
                  color="primary"
                >
                  {UpdateMode && <> <L>Modifier</L></>}
                  {!UpdateMode && <> <L>Ajouter</L></>}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md="12">{getDataCollection()}</Col>
            </Row>
          </AccordionDetails>
        )}
      </Accordion>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Fromations;
