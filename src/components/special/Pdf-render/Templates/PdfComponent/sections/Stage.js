import {pdfStyles} from "../PdfStyles";
import {StyleSheet} from "@react-pdf/renderer";
import React from "react";
import ExperiencesDisplay from "../ExperiencesDisplay";


const Stage = (props) => {
 
    const style = props.style ? props.style : null;
    const model = { ...props.PdfDataModel.data };
    const position = props.PdfDataModel.preference.sectionPostion.Stage
    if (typeof model.Stages != "undefined") {
        return model.Stages.map((vals, index) => {
            return (
                <ExperiencesDisplay  style={style}  position={position} key={index} dataModel={vals}>
                    {" "}
                </ExperiencesDisplay>
            );
        });
    } else {
        return <></>;
    }

}

export default Stage