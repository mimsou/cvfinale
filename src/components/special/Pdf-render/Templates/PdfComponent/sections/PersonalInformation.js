import {StyleSheet, Text, View} from "@react-pdf/renderer";
import SvgRender from "../SvgRender";
import {baby, home, mail, phone , pay} from "../SvgIcones";
import {Accessible} from "@mui/icons-material"
import React from "react";
import {pdfStyles} from "../PdfStyles";

const PersonalInformation = (props) => {

    const iconeSize = "25px";

    let styles = {}
    if(props.style){
       styles = StyleSheet.create(props.style);
    }else{
        styles = StyleSheet.create(pdfStyles(props));
    }


    const model = { ...props.PdfDataModel.data.profilePersonel };

    let personalInforComp = [];



    if (typeof model.titre != "undefined") {
        if (model.titre.value != "") {
            personalInforComp.push(
                <Text style={styles.sideText}>{model.titre.value}</Text>
            );
        }
    }

    if (typeof model.telephone != "undefined") {

        if (model.telephone.value) {
            personalInforComp.push(
                <View style={styles.inlineIconeText}>
                    <SvgRender  stroke={"#ffffff"}   style={{...styles.Inlinetext,width:iconeSize,height:iconeSize}} svgXml={phone} ></SvgRender>
                    <Text style={styles.sideText}>{model.telephone.value}</Text>
                </View>
            );
        }
    }

    if (typeof model.adress != "undefined") {
        if (model.adress.value) {
            personalInforComp.push(
                <View style={styles.inlineIconeText}>
                    <SvgRender    style={{...styles.Inlinetext,width:iconeSize,height: iconeSize}} svgXml={home} ></SvgRender>
                    <Text style={styles.sideText}>{model.adress.value}</Text>
                </View>

            );
        }
    }

    if (typeof model.pay != "undefined") {
        if (model.pay.value) {
            personalInforComp.push(
                <View style={styles.inlineIconeText}>
                    <SvgRender   style={{...styles.Inlinetext,width:iconeSize,height: iconeSize}} svgXml={pay} ></SvgRender>
                    <Text style={styles.sideText}>{model.pay.value}</Text>
                </View>
            );
        }
    }


    if (typeof model.email != "undefined") {
        if (model.email.value) {
            personalInforComp.push(
                <View style={styles.inlineIconeText}>
                    <SvgRender    style={{...styles.Inlinetext,width:iconeSize,height: iconeSize}} svgXml={mail} ></SvgRender>
                    <Text style={styles.sideText}>{model.email.value}</Text>
                </View>

            );
        }
    }


    if (typeof model.linkedin != "undefined") {
        if (model.linkedin.value) {
            personalInforComp.push(
                <Text style={styles.sideText}>{model.linkedin.value}</Text>
            );
        }
    }

    if (typeof model.datenainssance != "undefined") {
        if (model.datenainssance.value) {
            personalInforComp.push(
                <View style={styles.inlineIconeText}>
                    <SvgRender    style={{...styles.Inlinetext,width:iconeSize,height: iconeSize}} svgXml={baby} ></SvgRender>
                    <Text style={styles.sideText}>{model.datenainssance.value}</Text>
                </View>
            );
        }
    }



    return personalInforComp;

}

export default PersonalInformation;