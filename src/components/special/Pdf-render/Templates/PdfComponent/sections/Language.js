import {pdfStyles} from "../PdfStyles";
import {StyleSheet, View} from "@react-pdf/renderer";
import RatingDisplay from "../RatingDisplay";
import React from "react";

const Language = (props) => {



    const style = props.style ? props.style : null;

    const model = { ...props.PdfDataModel.data };
    if (typeof model.langue != "undefined") {
        return model.langue.map((vals, index) => {
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

export default Language