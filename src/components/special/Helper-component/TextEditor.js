import React, {  useState, useEffect } from "react";
import { Input } from "reactstrap";

const TextEditor = (props) => {

  const [DataModelInput, setDataModelInput] = useState("");

  useEffect(() => {
    if (typeof props.value != "undefined") {
      setDataModelInput(props.value);
    }
  }, [props.value]);

  const getLabel = ()=>{
    if(typeof props.label !="undefined")  {return props.label} else { return "" }
  }

  const getName = ()=>{
    if(typeof props.name !="undefined")  {return props.name} else { return false }
  }


  return (
    <div
      
      style={{
        border: "1px solid #e9ecef",
        borderRadius: "5px",
        padding: "10px",
        marginTop:"10px"
      }}
    >
      <p> {getLabel()} </p>
      <Input
        value={DataModelInput}
        type="textarea"
        name={getName()}
        onChange={(e) => {
          if(typeof props.onChange !="undefined" && typeof e !="undefined"){
            props.onChange(e);
          }
        }}
      />
    </div>
  );
};

export default TextEditor;
