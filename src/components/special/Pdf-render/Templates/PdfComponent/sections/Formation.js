import {pdfStyles} from "../PdfStyles";
import {StyleSheet} from "@react-pdf/renderer";
import React from "react";
import ExperiencesDisplay from "../ExperiencesDisplay";


const Formation = (props) => {

    const styles = StyleSheet.create(pdfStyles(props));
    const model = { ...props.PdfDataModel.data };

    if (typeof model.formation != "undefined") {
        return model.formation.map((vals, index) => {
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

export default Formation