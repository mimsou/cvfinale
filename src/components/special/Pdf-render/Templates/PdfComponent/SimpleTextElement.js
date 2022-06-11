import React, { useEffect, useState } from "react";
import {pdfStyles , pdfStyles_d} from "./PdfStyles";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles


const SimpleTextelement = (props) => {

  let styles = {}
  if(props.style){
      styles = StyleSheet.create(props.style);
  }else{
    if(props.position == "g"){
      styles = StyleSheet.create(pdfStyles(props));
    }else{
      styles = StyleSheet.create(pdfStyles_d(props));
    }  
  }


  const [PdfLibelle, setPdfLibelle] = useState("");

  const getRatingDsiplayLibelle = () => {
    if (typeof PdfLibelle != "undefined") {
      if (PdfLibelle != "") {
        return <Text style={styles.sideText}>{PdfLibelle}</Text>;
      }
    }
    return <Text style={styles.sideText}>{"Val"}</Text>;
  };

  useEffect(() => {
    setPdfLibelle(props.libelle);
  }, [props.libelle]);

  if (typeof PdfLibelle == "undefined") {
    return <View></View>;
  } else {
    return (
      <View style={styles.maincontainer}>
        <View style={styles.container}>{getRatingDsiplayLibelle()}</View>
      </View>
    );
  }
};

export default SimpleTextelement;
