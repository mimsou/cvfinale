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
import {
  ArrowDownLeftSquare,
  ArrowUpRightSquare,
  Circle,
  CircleFill,
  DashCircle,
} from "react-bootstrap-icons";
import "@dsalvagni/react-profile-picture/build/ProfilePicture.css";
import SingleTitleItemViewer from "../Helper-component/SingleTitleItemViewer";
import L from "../../../locale";
import OrderWidget from "../Helper-component/OrderWidget";
import {sortableContainer, sortableElement} from "react-sortable-hoc";
import {arrayMoveImmutable} from "array-move";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Langue = (props) => {
  const jsonCopy = (src) => {
    return JSON.parse(JSON.stringify(src));
  };

  const circle = (
    <Circle className="m-1" style={{ color: "#AEAEAE", fontSize: "24px" }} />
  );
  const circleFill = (
    <CircleFill style={{ color: "#AEAEAE", fontSize: "24px" }} />
  );

  const style = {
    bgItem: {
      backgroundColor: "#FFFFFF",
    },
  };

  const [Collapsed, setCollapsed] = useState(true);

  const [IdCollection, setIdCollection] = useState(0);

  const [UpdateMode, setUpdateMode] = useState(false);

  const [DataModelReset, setDataModelReset] = useState({
    libelle: { active: true, value: "" },
  });

  const [DataModel, setDataModel] = useState({
    libelle: { active: true, value: "" },
  });

  const getNextIdCollection = () => {
    let newId = IdCollection + 1;
    setIdCollection(newId);
    return newId;
  };

  const deleteItem = (selectedDataModel) => {
    let datacollectcopy = [...DataModelCollection];
    let objIndex = datacollectcopy.findIndex(
      (obj) => obj.id == selectedDataModel.id
    );
    datacollectcopy.splice(objIndex, 1);
    setDataModelCollection(datacollectcopy);
  };

  const [DataModelCollection, setDataModelCollection] = useState(props.inputDataModel?.centreInteret ? props.inputDataModel?.centreInteret : []);

  let profilePictureRef = "";

  const handleInputChange = (events) => {
    const target = events.nativeEvent.target;
    const values = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const newobj = JSON.parse(JSON.stringify(DataModel));
    newobj[name].value = values;
    setDataModel(newobj);
  };

  const addFormation = () => {
    if (!UpdateMode) {
      let datamodelcopy = jsonCopy(DataModel);
      let datacollectcopy = [...DataModelCollection];
      datamodelcopy.id = getNextIdCollection();
      datacollectcopy.push(datamodelcopy);
      setDataModelCollection(datacollectcopy);
    } else {
      let datamodelcopy = jsonCopy(DataModel);
      let datacollectcopy = [...DataModelCollection];
      let objIndex = datacollectcopy.findIndex(
        (obj) => obj.id == datamodelcopy.id
      );
      datacollectcopy[objIndex] = datamodelcopy;
      setDataModelCollection(datacollectcopy);
      setUpdateMode(false);
    }
    setDataModel(DataModelReset)
  };

  profilePictureRef = useRef();

  useEffect(() => {
    props.updateModel("centreInteret", DataModelCollection);
  }, [DataModelCollection]);

  useEffect(() => {
    if(typeof props.inputDataModel?.centreInteret != "undefined" ){
      setDataModelCollection(props.inputDataModel["centreInteret"]) 
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
                  title={data.libelle.value}
              />
            </SortableItem>
        )
      })
      }
    </SortableContainer>)
  }

  if (props.mode == "render") {
    return <></>;
  } else if (props.mode == "input") {
    return (
      <div style={props.show ? {} : { display:"none" } }  className="MainSectionWarp">
      <OrderWidget {...props} updateOrder={(main,name,order,direction)=>props.updateOrder(main,name,order,direction)} />
     <Accordion flush expanded={!Collapsed} onChange={(e,expanded)=>setCollapsed(!expanded)} style={style.bgItem}>
       
       <AccordionSummary expandIcon={<ExpandMoreIcon />} className="SectionHeading" >
         
           <L>Centres d'intérêt</L> <DashCircle className="remove_section_cione" onClick={(e)=>{e.stopPropagation() ;props.removeSection(props.name);}}  />
        </AccordionSummary>
        {!Collapsed && (
          <AccordionDetails>
            <Row>
              <Col sm={12}>
                <Label className="form-control-sm" for="libelle" sm={12}>
                  <L>Centre d'intérêt</L>
                </Label>
                <Input
                  value={DataModel.libelle.value}
                  onChange={handleInputChange}
                  className="form-control-sm"
                  type="text"
                  name="libelle"
                  id="libelle"
                  placeholder="Centre d'intérêt"
                />
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

export default Langue;
