import {pdfStyles} from "../PdfStyles";
import {StyleSheet} from "@react-pdf/renderer";
import React from "react";
import ExperiencesDisplay from "../ExperiencesDisplay";


const Formation = (props) => {

    const style = props.style ? props.style : null;
    const model = { ...props.PdfDataModel.data };
    const position = props.PdfDataModel.preference.sectionPostion.Fromations
    if (typeof model.formation != "undefined") {
        return model.formation.map((vals, index) => {
            return (
                <ExperiencesDisplay  style={style} position={position} key={index} dataModel={vals}>
                    {" "}
                </ExperiencesDisplay>
            );
        });
    } else {
        return <></>;
    }

}

export default Formation