import React, { useEffect, useState } from "react";
import { PaletteFill } from "react-bootstrap-icons";

const PaletteViewer = (props) => {

  const [Palette, setPalette] = useState({
      ColorA:"",
      ColorB:"",
      ColorC:""
  });

  useEffect(() => {
    if (typeof props.palette != "undefined") setPalette(props.palette);
  }, [props.palette]);


  const style = {
      colora :{
         backgroundColor:Palette.ColorA,
         width:"100%",
         margin:"5px",
         borderRadius:"5px"
      } ,
      colorb : {
        backgroundColor:Palette.ColorB,
        width:"100%",
        margin:"5px",
        borderRadius:"5px"
     } ,
      colorc  :{
        backgroundColor:Palette.ColorC,
        width:"100%",
        margin:"5px",
        borderRadius:"5px"
     } 
  }

  if (Palette.ColorA != "") {
    return (
      <div
        style={{
          width: "100%",
          height: "80px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={style.colora}></div>
        <div style={style.colorb}></div>
        <div style={style.colorc}></div>
      </div>
    );
  } else {
    return <div>{"loading"}</div>;
  }
};

export default PaletteViewer;
