import {Close} from  "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Col, Container, ListGroup, Row } from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Templates } from "./Pdf-render/Templates/Preferences/Templates";
import { Fonts } from "./Pdf-render/Templates/Preferences/Fonts";
import { Palettes } from "./Pdf-render/Templates/Preferences/Palettes";
import PaletteViewer from "./Pdf-render/Templates/Preferences/PaletteViewer";
import L from "../../locale";
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import WebIcon from '@mui/icons-material/Web';
import { ClickAwayListener } from "@mui/material";


const PreferenceBare = (props) => {

  const [Classname, setClassname] = useState("pref pref-close screenHub");
  const [Cv,updateCv] = useState(props.currentCv)
  const [mobilPrefToggle,SetmobilPrefToggle] = useState(false)
  const [currentPref,SetcurrentPref] = useState("")

  let templateSlider = "";
  let paletteSlider = "";
  let fontSlider = "";


  let templateSliderM = "";
  let paletteSliderM = "";
  let fontSliderM = "";

  const tggoleMobilePRef = () => {
    SetmobilPrefToggle(!mobilPrefToggle)
  }

  



  useEffect(() => {
    if(props.currentCv?.preference) {

    const idTemplate = props.currentCv.preference.Template.id
    const idFont = props.currentCv.preference.Font.id
    const idPalette = props.currentCv.preference.Palette.id

    // templateSlider.slickGoTo(idTemplate)
    // paletteSlider.slickGoTo(idPalette)
    // fontSlider.slickGoTo(idFont)

    templateSliderM.slickGoTo(idTemplate)
    paletteSliderM.slickGoTo(idPalette)
    fontSliderM.slickGoTo(idFont)

    }
  }, []);

  useEffect(() => {
      props.updateCurrentCv(Cv)
  }, [Cv]);

  useEffect(() => {
    if (typeof props.status != "undefined") {
      if (props.status) {
        setClassname("pref pref-open screenHub");
      } else {
        setClassname("pref pref-close screenHub");
      }
    } else {
      setClassname("pref pref-close screenHub");
    }
  }, [props.status]);

  const closeThis = () => {
    if (typeof props.closePref != "undefined") {
      props.closePref();
    }
  };

  const getTemplates = () => {
    
    return Templates.map((val, keys) => {
      return (
        <div    key={keys}   onClick={()=>handlePrefSelection(val,"template")} className="StlikItem">
          <div className="itemWarp">
            <div style={{height:"280px",textAlign:"center"}}><img style={{margin:"auto"}} width={198} height={280} src={val.thumb} /></div>
          </div>
        </div>
      );
    });
  };

  const getFonts = () => {
    return Fonts.map((val, keys) => {
      return (
        <div key={keys} onClick={()=>handlePrefSelection(val,"font")} className="StlikItem">
          <div className={"itemWarp"}>
            <div style={{fontSize:"24px",verticalAlign:"center",height:"100%",paddingTop:"20px"}} className={"fontitem " + val.className}>{val.name}</div>
          </div>
        </div>
      );
    });
  };

  const getPalettes = () => {
    return Palettes.map((val, keys) => {
      return (
        <div key={keys}  onClick={()=>handlePrefSelection(val,"palette")} className="StlikItem">
          <div className="itemWarp">
            <PaletteViewer  palette={val} />
            {val.name}
          </div>
        </div>
      );
    });
  };

  const handlePrefSlide = (index, PrefType) => {
    let CvCopy = {}
    switch (PrefType) {
      case "template":
        CvCopy = {...Cv};
        CvCopy.preference.Template = Templates[index];
        updateCv(CvCopy);
        break;
      case "font":
        CvCopy = {...Cv};
        CvCopy.preference.Font = Fonts[index];
        updateCv(CvCopy);
        break;
      case "palette":
        CvCopy = {...Cv};
        CvCopy.preference.Palette = Palettes[index];
        updateCv(CvCopy);
        break;
    }
  };


  const handlePrefSelection = (pref, PrefType) => {
    let CvCopy = {}
    switch (PrefType) {
      case "template":
        CvCopy = {...Cv};
        CvCopy.preference.Template = pref;
        updateCv(CvCopy);
        break;
      case "font":
        CvCopy = {...Cv};
        CvCopy.preference.Font = pref;
        updateCv(CvCopy);
        break;
      case "palette":
        CvCopy = {...Cv};
        CvCopy.preference.Palette = pref;
        updateCv(CvCopy);
        break;
    }
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const ToggleShowPref = (e,pref) => {
    e.stopPropagation()
    SetcurrentPref(pref)
    if(currentPref == pref && mobilPrefToggle){
         SetmobilPrefToggle(false)
    }else{
      SetmobilPrefToggle(true)
    }
  }

  const prefClass = () => {
    return  mobilPrefToggle ? "floated_pereferences" : "floated_pereferences d-none";
  }

  const slideClass = (pref) => {
    return  currentPref == pref  ? "" : "d-none";
  }

  return (
    <>
     <Container style={{ overflowY: "auto"}}>
      <div onClick={(e)=>ToggleShowPref(e,"template")} className="prefrences_mobile_container"> 
         <WebIcon  />
       </div>

       <div onClick={(e)=>ToggleShowPref(e,"palette")} className="prefrences_mobile_container"> 
         <FormatColorFillIcon />
       </div>

       <div  onClick={(e)=>ToggleShowPref(e,"font")} className="prefrences_mobile_container"> 
         <FontDownloadIcon />
       </div>

       <ClickAwayListener onClickAway={()=>SetmobilPrefToggle(false)}>
       <div  className={prefClass()}>
        
            <Slider className={slideClass("template")} afterChange={(e)=>{handlePrefSlide(e , "template")}}  ref={slider => (templateSliderM = slider)} {...settings}>{getTemplates()}</Slider>
    
             <Slider  className={slideClass("palette")} afterChange={(e)=>{handlePrefSlide(e , "palette")}} ref={slider => (paletteSliderM = slider)} {...settings}>{getPalettes()}</Slider>
 
           <Slider  className={slideClass("font")}  afterChange={(e)=>{handlePrefSlide(e , "font")}} ref={slider => (fontSliderM = slider)} {...settings}>{getFonts()}</Slider>
     
        </div>
        </ClickAwayListener>

   
     </Container>
   
    {/* <div style={{display:"none"}} className={Classname}>
     

      <Container  style={{ overflowY: "auto" }}>

          <Row>
        <Col md="6" xs="12" >
          <Row>
            <Col md="12">
              <div className={"preference_lib"}> <L>Choix de template</L> </div>
            </Col>
          </Row>
          <Col md="12"  >
            <Slider afterChange={(e)=>{handlePrefSlide(e , "template")}}  ref={slider => (templateSlider = slider)} {...settings}>{getTemplates()}</Slider>
          </Col>
        </Col>

        <Col md="6" xs="12" >
          <Row>
            <Col md="12"> 
             <div className={"preference_lib"}><L>Personnalisation</L></div>
            </Col>
          </Row>
          <Row>
         <Col md="12">
          <Slider afterChange={(e)=>{handlePrefSlide(e , "palette")}} ref={slider => (paletteSlider = slider)} {...settings}>{getPalettes()}</Slider>
         </Col>

         <Col md="12">
          <Slider afterChange={(e)=>{handlePrefSlide(e , "font")}} ref={slider => (fontSlider = slider)} {...settings}>{getFonts()}</Slider>
         </Col>
          </Row>
        </Col>

          </Row>
        <Row>
          <Col md="12">
            <button
                onClick={() => {
                  closeThis();
                }}
                className="closeButton"
            > <L>Fermer</L> </button>
           </Col>
        </Row>
     
      </Container>
    </div> */}
    </>
  );
};

export default PreferenceBare;
