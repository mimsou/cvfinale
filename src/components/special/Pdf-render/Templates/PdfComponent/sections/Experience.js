import {pdfStyles} from "../PdfStyles";
import {StyleSheet} from "@react-pdf/renderer";
import React from "react";
import ExperiencesDisplay from "../ExperiencesDisplay";


const Experience = (props) => {

    const styles = StyleSheet.create(pdfStyles(props));

    const model = { ...props.PdfDataModel.data };

    if (typeof model.experienceProfessionel != "undefined") {
        return model.experienceProfessionel.map((vals, index) => {
            return (
                <ExperiencesDisplay key={index} dataModel={vals}>
                    {" "}
                </ExperiencesDisplay>
            );
        });
    } else {
        return <></>;
    }

}

export default Experience