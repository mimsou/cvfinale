import React from "react";
import { AlignEnd, AlignStart } from "react-bootstrap-icons";
 


 

const PositionWidget = (props) => {
  
    const getPropsPositionState = () => {
        if(props.position){
            return props.position;
         }
         return false;
    }

    const setPostion = (e,pos) => {
        e.stopPropagation()
        props.setSectionPostion(pos)
    }
    
  return (
      <div className={props.className}>
         
         {getPropsPositionState() == "g" &&
          <div className="position_area_container" onClick={(e)=>setPostion(e,"d")}>
           <AlignEnd  />
          </div>
         }
     
   
     {getPropsPositionState() == "d" &&
       <div className="position_area_container" onClick={(e)=>setPostion(e,"g")} >
        <AlignStart  />
        </div>
    } 
    </div>
  );
};

export default PositionWidget;