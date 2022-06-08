import React from "react";
import {   Edit, DeleteOutline } from "@mui/icons-material";

 

const SingleTitleItemViewer = (props) => {

  const editElements = () => {
    props.editElement(props.val)
  } 

  const deleteItem = ()=>{
    props.deleteItem(props.val)
  }

  return (
    <div className="row m-2 p-2 simple_collection_item" style={{border: "1px solid #e9ecef",borderRadius:"5px",padding:"10px"}}>
      <div className="col-6 dashed_left" style={{color:"#000000"}}> {props.title} </div>
      <div className="col-6 hoverLink" style={{display:"flex",justifyContent:"flex-end",paddingTop:"3px",color:"#999999"}}>
          <Edit onClick={()=>{editElements()}} />
          <div style={{display:"inline-block", width:"10px"}}></div>{" "}
          <DeleteOutline  onClick={()=>{deleteItem()}} />{" "} 
      </div>
    </div>
  );
};

export default SingleTitleItemViewer;
