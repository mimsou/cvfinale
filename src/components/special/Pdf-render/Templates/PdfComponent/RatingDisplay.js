import React, { useEffect, useState } from "react";
import {
  Page,
  Image,
  Text,
  View,
  Document,
  Circle,
  StyleSheet,
  Font,
  Svg,
} from "@react-pdf/renderer";
import lighDot from "../images/lightDot.png";
import {pdfStyles} from "./PdfStyles";
import darkDot from "../images/darkDot.png";
import SvgRender from "./SvgRender";
import {devider, dot} from "./SvgIcones";

// Create styles


const RatingDisplay = (props) => {


  let styles = {}
  if(props.style){
    styles = StyleSheet.create(props.style);
  }else{
    styles = StyleSheet.create(pdfStyles(props));
  }

  const colorA = (props.PdfDataModel.preference?.Palette?.ColorA != "undefined") ?  props.PdfDataModel.preference?.Palette?.ColorA : "#264653"
  const colorC = (props.PdfDataModel.preference?.Palette?.ColorC != "undefined") ?  props.PdfDataModel.preference?.Palette?.ColorC : "#e9c46a"
  const colorB = (props.PdfDataModel.preference?.Palette?.ColorB != "undefined") ?  props.PdfDataModel.preference?.Palette?.ColorB : "#e9c46a"

  
  const [PdfDataModel, setPdfDataModel] = useState(0);
  const [PdfLibelle, setPdfLibelle] = useState("");


  const getRatingDsiplay = () => {
    let ratingDisplay = [];
    for (let i = 0; i < PdfDataModel; i++) {
      ratingDisplay.push(
          <View style={{paddingTop:"7px"}}>
          <SvgRender fill={styles.Sidefill.color} style={styles.ratingDot} svgXml={dot}  />
          </View>
      );
    }
    return ratingDisplay;
  };

  
  const getRatingDsiplayLibelle = () => {
    if(typeof PdfLibelle != "undefined"){
        if(PdfLibelle != ""){
            return <Text style={styles.sideText}>{PdfLibelle}</Text>
        }
    }
    return <Text  style={styles.sideText}>{"Val"}</Text>; 
  };

  useEffect(() => {
    setPdfDataModel(props.rating);
  }, [props.rating]);

  useEffect(() => {
    setPdfLibelle(props.libelle);
  }, [props.libelle]);

  if (typeof PdfDataModel == "undefined") {
    return <View></View>;
  } else {
    return (
    <View wrap={false}  style={styles.maincontainer}>
     <View style={styles.container}>{getRatingDsiplayLibelle()}</View>
    <View style={styles.container}>{getRatingDsiplay()}</View>
    </View>
    );
  }
};

export default RatingDisplay;
