import React, { Component, useEffect, useState } from "react";
import {
  Col,
  Input,
  Row
} from "reactstrap";



const DatePicker = (props) => {

  const year = new Date().getFullYear();

  const [DateValue, setDateValue] = useState({mois:"",anne:""});

  const [InpDateValue, setInpDateValue] = useState({mois:"",anne:""});

  const [Anne, setAnne] = useState();

  const [Mois, setMois] = useState();

  
  const handleInputChange = (events) => {
    const target = events.nativeEvent.target;
    const values = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const newobj = JSON.parse(JSON.stringify(DateValue));
    newobj[name] = values;
    setInpDateValue(newobj);
  };
 

  useEffect(() => {
    if(props.disable){
      props.onChange({mois:"",anne:"Present"});
    }else{
      props.onChange(InpDateValue);
    }

  }, [InpDateValue]);

  useEffect(() => {
      setDateValue(props.value)
  }, [props.value]);
  
  
  const yearSelect = () => {
    let selectyear = [];
  selectyear.push(<option key={0} value={""}>{"Anné"}</option>);
    for (let i = year; i > 1960; i--) {
      selectyear.push(<option key={i} value={i}>{i}</option>);
    }
    return selectyear;
  };

  const mounthSelect = () => {

    const mounthlist = [
      {value:"",title:"Mois"},
      {value:"01",title:"Janvier"},
      {value:"02",title:"Février"},
      {value:"03",title:"Mars"},
      {value:"04",title:"Avril"},
      {value:"05",title:"Mai"},
      {value:"06",title:"Juin"},
      {value:"07",title:"juillet"},
      {value:"08",title:"Août"},
      {value:"09",title:"Septembre"},
      {value:"10",title:"Octobre"},
      {value:"11",title:"Novembre"},
      {value:"12",title:"Décembre"}
    ]

    return mounthlist.map((val,i)=>{
      let isselected;
      (val.value==DateValue.mois) ?   isselected = true : isselected = false;
     return <option  key={val.value}  value={val.value} >{val.title}</option>
    })

  };

  return (
    <Row  >
      <Col md={6}>
        <Input  value={DateValue.mois} name="mois" onChange={handleInputChange} type="select">
        {mounthSelect()}
        </Input>
      </Col>
      <Col md={6}>
        <Input    value={DateValue.anne} name="anne"  onChange={handleInputChange} type="select">{yearSelect()}</Input>
      </Col>
    </Row>
  );
};

export default DatePicker;
