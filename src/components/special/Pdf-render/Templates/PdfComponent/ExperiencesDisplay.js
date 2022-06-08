import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  maincontainer: {
    paddingTop:"10px",
    paddingBottom:"10px",
    width: "320px",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "11px",
  },
  normalText: {
    fontWeight: "normal",
    fontSize: "10px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100px",
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headChild: {
    display: "inline-block",
    width:"65%"
  },
  periodChild: {
    display: "inline-block",
    textAlign:"right",
    width:"35%"
  },
  middle: {
    marginTop:"5px",
    width: "100%",
  },
  body: {
    marginTop:"5px",
    marginBottom:"5px",
},
});

const ExperiencesDisplay = (props) => {

  const [PdfDataModel, setPdfDataModel] = useState(0);

  useEffect(() => {
    setPdfDataModel(props.dataModel);
  }, [props.dataModel]);

  const getMoisAbr = (mounth) => {
    return mounth;
  };

  const getDescription = () =>{

    const model = { ...PdfDataModel };

    if (typeof model.description != "undefined") {
       return <Text style={styles.normalText} >{ model.description.value }</Text>
    }
  } 

  const getPeriode = () => {

    const model = { ...PdfDataModel };

    let dates = "";

    if (typeof model.datedebut != "undefined") {
      if (model.datedebut.value.anne) {
        if (model.datedebut.value.mois) {
          dates += getMoisAbr(model.datedebut.value.mois) + ". ";
        }

        dates += model.datedebut.value.anne;
      }

      if (model.datefin.value.anne) {
        if (model.datedebut.value.anne) {
          dates += " - ";
        }

        if (model.datefin.value.mois) {
          dates += getMoisAbr(model.datefin.value.mois) + ". ";
        }

        dates += model.datefin.value.anne;
      }

      return <Text style={styles.boldText}>{dates}</Text>;
      
    } else {
      return <Text>a</Text>;
    }
  };

  const getTitle = () => {
    const model = { ...PdfDataModel };

    let titlenName = "";

    if (typeof model.poste != "undefined") {
      titlenName = "poste";
    } else if (typeof model.formation != "undefined") {
      titlenName = "formation";
    } else if (typeof model.post != "undefined") {
      titlenName = "poste";
    }

    if (titlenName) {
      const title = model[titlenName].value;
      return <Text style={styles.boldText}>{title}</Text>;
    } else {
      return <Text></Text>;
    }
  };

  const getLieu = () => {
    
    const model = { ...PdfDataModel };

    let lieux = "";

    console.log("mymodal",model)

    if (typeof model.employeur != "undefined") {

      if (model.employeur.value) {
        lieux += model.employeur.value;
      }

      if (model.lieu.value) {
        if (model.employeur.value ) {
          lieux += ", ";
        }
        lieux += model.lieu.value;
      }

      return <Text style={styles.normalText}>{lieux}</Text>;

    } else if (typeof model.institue != "undefined") {

      if (model.institue.value) {
        lieux += model.institue.value;
      }

      if (model.lieu.value) {
        if ( model.institue.value) {
          lieux += ", ";
        }
        lieux += model.lieu.value;
      }

      return <Text style={styles.normalText}>{lieux}</Text>;

    }else{

      return <Text></Text>;

    }
  };

  if (typeof PdfDataModel == "undefined") {
    return <View><Text>sss</Text></View>;
  } else {
    return (
      <View wrap={false}  style={styles.maincontainer}>
        <View style={styles.head}>
          <View style={styles.headChild}>{getTitle()}</View>
          <View style={styles.periodChild}>{getPeriode()}</View>
        </View>
        <View style={styles.middle}>{getLieu()}</View>
        <View style={styles.body}>
        {getDescription()}
        </View>
        
      </View>
    );
  }
};

export default ExperiencesDisplay;
