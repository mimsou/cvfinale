import React, { useContext, useState } from "react";
import  FrSvg  from "./flags/fr.svg"
import  GbSvg  from "./flags/gb.svg"
import all from "./../../../locales/all"

import SvgRender from "../Pdf-render/Templates/PdfComponent/SvgRender";
import { LanguageContext } from "localeContext";

const LangPicker = (props) => {

  const [lang, setLang] = useContext(LanguageContext)
  const [Language, setLanguage] = useState(lang);

  const iconsLang = {
    "en":GbSvg,
    "fr":FrSvg
  }

  const isLanding = () =>{
    if(props?.landing){
      return true
    }
    return false
  }
 
  const handleLanguageChange = (lang) => {
       window.gtag("event", "Changement de langue"); 
       
       if(isLanding()){

        if(lang=="en"){
          window.location.replace("https://app.cviotek.com/"+lang)
        }else{
          window.location.replace("https://app.cviotek.com/")
        }
           
       }else{
        props.setLanguage(lang)
        setLanguage(lang)
       }
     
  };

  return (
      <div {...props}>
          {Object.entries(all).map((lang ,value)=>{
         return  <img onClick={()=>handleLanguageChange(lang[0])} className={"svg_btn " +  (Language==lang[0] ? "lang_selected" : "")} width={20} height={20} src={iconsLang[lang[0]]} />
        })}
      </div>
  );
};

export default LangPicker;
