import {StyleSheet, View} from "@react-pdf/renderer";
import RatingDisplay from "../RatingDisplay";
import React from "react";
import {pdfStyles} from "../PdfStyles";

const Competance = (props) => {

    const model = { ...props.PdfDataModel.data };

    const style = props.style ? props.style : null;

    if (typeof model.competance != "undefined") {
        return model.competance.map((vals, index) => {
            return (
                <View key={index}>
                    <RatingDisplay
                        PdfDataModel={props.PdfDataModel}
                        style={style}
                        libelle={vals.libelle.value}
                        rating={vals.value.value}
                    >
                        {" "}
                    </RatingDisplay>
                </View>
            );
        });
    } else {
        return <></>;
    }

}

export default Competance