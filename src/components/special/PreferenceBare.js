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


const PreferenceBare = (props) => {

  const [Classname, setClassname] = useState("pref pref-close");
  const [Cv,updateCv] = useState(props.currentCv)

  let templateSlider = "";
  let paletteSlider = "";
  let fontSlider = "";

  useEffect(() => {
    if(props.currentCv?.preference) {
    const idTemplate = props.currentCv.preference.Template.id
    const idFont = props.currentCv.preference.Font.id
    const idPalette = props.currentCv.preference.Palette.id
    templateSlider.slickGoTo(idTemplate)
    paletteSlider.slickGoTo(idPalette)
    fontSlider.slickGoTo(idFont)
    }
  }, []);

  useEffect(() => {
      props.updateCurrentCv(Cv)
  }, [Cv]);

  useEffect(() => {
    if (typeof props.status != "undefined") {
      if (props.status) {
        setClassname("pref pref-open");
      } else {
        setClassname("pref pref-close");
      }
    } else {
      setClassname("pref pref-close");
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
            {props.status && <div><img src={val.thumb} /></div> }
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
            <div style={{fontSize:"24px",verticalAlign:"center",height:"100%"}} className={"fontitem " + val.className}>{val.name}</div>
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

  return (
    <div className={Classname}>
      <Container style={{ overflowY: "auto" }}>

          <Row>
        <Col md="6" xs="12" >
          <Row>
            <Col md="12">
              <div className={"preference_lib"}> <L>Choix de template</L> </div>
            </Col>
          </Row>
          <Col md="12"  >
            <Slider ref={slider => (templateSlider = slider)} {...settings}>{getTemplates()}</Slider>
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
          <Slider ref={slider => (paletteSlider = slider)} {...settings}>{getPalettes()}</Slider>
         </Col>

         <Col md="12">
          <Slider  ref={slider => (fontSlider = slider)} {...settings}>{getFonts()}</Slider>
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
    </div>
  );
};

export default PreferenceBare;
