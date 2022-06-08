import React, {useContext} from "react";
import {LanguageContext} from "./localeContext";
import all from "./locales/all";

const Locales = (props) => {

    const [lang, setLang] = useContext(LanguageContext)
    const Childtext = props.children

    if(lang == "fr"){
        return Childtext;
    }else{
        const loc =all[lang];
        return loc[Childtext.trim()] ? loc[Childtext.trim()] : Childtext;
    }

}

export default Locales;