import {pdfStyles} from "../PdfStyles";
import {StyleSheet, View} from "@react-pdf/renderer";
import React from "react";
import SimpleTextelement from "../SimpleTextElement";


const CentreInteret = (props) => {

    const style = props.style ? props.style : null;

    const model = { ...props.PdfDataModel.data };
    const position = props.PdfDataModel.preference.sectionPostion.CentreInteret
    if (typeof model.centreInteret != "undefined") {
        return model.centreInteret.map((vals, index) => {
            return (
                <View key={index}>
                    <SimpleTextelement   position={position} PdfDataModel={props.PdfDataModel} style={style}  libelle={vals.libelle.value}>
                        {" "}
                    </SimpleTextelement>
                </View>
            );
        });
    } else {
        return <></>;
    }

}

export default CentreInteret