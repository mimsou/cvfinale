import React, {useContext, useEffect, useState} from "react";
import "../../assets/css/landing.css";
import logo from "../../assets/img/brand/logo.png"
import image from "../../components/special/Pdf-render/Templates/images/creation_cv.jpg"
import image_a from "../../components/special/Pdf-render/Templates/images/creation_cv_2.jpg"
import image_b from "../../components/special/Pdf-render/Templates/images/creation_cv_3.jpg"
import L from "../../locale";
import LangPicker from  "../../components/special/Helper-component/LangPicker";
import {LanguageContext} from "../../localeContext";
import convertPdfToImages from "../../components/special/Helper-component/PdfAsImage";
import userService from "../../services/user.service";

const Landing = (props) => {

    document.body.style.backgroundColor = "#ebf2f6"
    document.title = "Cviotek votre Cv en ligne gratuit"
    const [lang, setLang] = useContext(LanguageContext);
    const [Tik, setTik] = useState(0);
    const [index, setIndex] = useState(0);
    const [pos, setPos] = useState(0);
    const [leftStyle, setleftStyle] = useState( {left:"0vh"});
    const [stepAnimation, setStepAnimation] = useState(50);

    useEffect(() => {

        const int = setInterval(() => {
            setTik((Tik) => Tik + 1);
        }, 5000);
        return () => {
            clearInterval(int);
        };
    }, []);

    useEffect(() => {

        const count = getImages().length;
        if(index+1 >= count){
            setIndex(0)
            setPos(0)
            setleftStyle({left:"0vh"})
        }else{
            setIndex(index+1)
            let position = (parseInt(pos) - parseInt(stepAnimation))
            setPos(position)
            const literal = position  + 'vh'
            setleftStyle({left:literal})
        }


    }, [Tik]);

    const getImages = () => {
        return [
            <img className="cv_images" src={image} />,
            <img className="cv_images" src={image_a} />,
            <img className="cv_images" src={image_b} />,
        ]
    }

 return (
     <div className="landing-main">
         <div className="brand">
             <img src={logo} />
         </div>
         <div className="upper_block" >
             <div className="upper_block">
                 <LangPicker className="lang-selection"  setLanguage={(lang)=>setLang(lang)}  />
                 <a className="cv_link" href="/auth/login" ><L> Crée mon CV </L></a>
                 <div className="creation_cv  d-none  d-xl-block" >
                     <div style={leftStyle} className="cv_carrousel">
                         {getImages()}
                     </div>
                 </div>
                 <h1><L>CVIOTEK APP – Créez votre CV gratuit en ligne</L></h1>
                 <div
                   className="upper_text">
                     <L>CV en ligne</L>
                 </div>
                  
             </div>
         </div>
         <div className="separator_block" >

         </div>
         <div className="bottom_block" >
             <div className="cv_description">
             <L>Avec notre application CVIOTEK APP, vous pouvez faire votre CV gratuitement en ligne.
             En plus, vous pouvez créer 2 ou 3 CV.
             Par ailleurs, une fois que vous avez fini votre CV, vous pouvez le télécharger facilement et rapidement au format PDF sur votre PC ou sur votre téléphone gratuitement.
             
             Vous êtes un demandeur d’emploi avec ou sans expérience qui a besoin d’un CV ?
             Vous êtes un étudiant qui a besoin d’un CV pour une inscription dans une université, une bourse d’étude, un stage ou un job étudiant ?
             
             Avec quelques clics, faites votre CV gratuit en ligne rapidement et faites le téléchargement en PDF.</L>
             
             </div>
         </div>
     </div>
 )

}

export default Landing;