import React from "react";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";


 

const OrderWidget = (props) => {

   const update = (dir) => {
       const main = getMain(props.name)
       const order = getOrder(props.index,props.name)
       props.updateOrder(main , props.name , order , dir  )
   }



   const getMain = (name) =>{
       if(["ProfilePersonel","DescriptionProfil"].includes(name)) return "profile";
       if(["Fromations","ExperienceProfessionel","Stage"].includes(name)) return "bigBlok";
       if(["Competances","Langue","CentreInteret"].includes(name)) return "Blok";
   }

    const getOrder = (key , name) =>{
        if(["ProfilePersonel","DescriptionProfil"].includes(name)) return parseInt(key);
        if(["Fromations","ExperienceProfessionel","Stage"].includes(name)) return parseInt(key) - 2;
        if(["Competances","Langue","CentreInteret"].includes(name))   return parseInt(key) - 6;
    }

  return (
    <div className="orderSelection">
      <KeyboardArrowUp onClick={()=>update("up")} className="orderUpIcone" />
      <KeyboardArrowDown  onClick={()=>update("down")}  className="orderDownIcone" />
    </div>
  );
};

export default OrderWidget;
