import {pdfStyles} from "../PdfStyles";
import {StyleSheet, Text} from "@react-pdf/renderer";
import React from "react";


const ProfileDescription = (props) => {

    const styles = props.style ? StyleSheet.create(props.style) : StyleSheet.create(pdfStyles(props));
    const model = { ...props.PdfDataModel.data };
    return <Text style={styles.descriptionText}> {model.descriptionProfil} </Text>

}

export default ProfileDescription