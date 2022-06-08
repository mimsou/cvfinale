import React, {useEffect} from "react";
import {
    Page,
    Image,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import {Fonts} from "./Preferences/Fonts";
import SvgRender from "./PdfComponent/SvgRender"
import {devider} from "./PdfComponent/SvgIcones"
import all from "../../../../locales/all";
import PersonalInformation from "./PdfComponent/sections/PersonalInformation";
import Competance from "./PdfComponent/sections/Competance";
import Language from "./PdfComponent/sections/Language";
import ProfileDescription from "./PdfComponent/sections/ProfileDescription";
import Experience from "./PdfComponent/sections/Experience";
import CentreInteret from "./PdfComponent/sections/CentreInteret";
import Stage from "./PdfComponent/sections/Stage";
import {pdfStyles} from "./PdfComponent/PdfStyles";
import {getFullname, getAvatarImage, getDescription} from "./PdfComponent/pdfContentHelper";
import Formation from "./PdfComponent/sections/Formation";

const ClassicTemplate = (props) => {


    const colorA = (props.PdfDataModel.preference?.Palette?.ColorA != "undefined") ?  props.PdfDataModel.preference?.Palette?.ColorA : "#264653"
    const colorC = (props.PdfDataModel.preference?.Palette?.ColorC != "undefined") ?  props.PdfDataModel.preference?.Palette?.ColorC : "#e9c46a"
    const colorB = (props.PdfDataModel.preference?.Palette?.ColorB != "undefined") ?  props.PdfDataModel.preference?.Palette?.ColorB : "#e9c46a"


    let extendedStyle = pdfStyles(props)



    extendedStyle.page = {
        backgroundColor: "#FFFFFF",
        fontFamily: props.PdfDataModel.preference?.Font?.name,
    }


    extendedStyle.head = {
        width:"100%",
        height:"350px"
    }

    extendedStyle.bottom = {
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        fontFamily: props.PdfDataModel.preference?.Font?.name,
    }

    extendedStyle.images = {
        width: "160px",
        height: "160px",
        position: "relative",
        borderRadius: "10%",
        margin:"38px",
        zIndex:"1",
    }

    extendedStyle.descriptionPosition = {
        position: "relative",
        zIndex:"1",
    }

    extendedStyle.separation = {
        position: "absolute",
        top: "340px",
        left:"-25px",
        zIndex:"1",
        width:"300px"
    }

    extendedStyle.sectionProfil = {
        borderRight:"1px solid "+colorA,
        minHeight: "100%",
        width: "39%",
        display: "flex",
        flexDirection: "row",
        zIndex:"15",
        position:"relative",
        color:"#413d3d"
    }

    extendedStyle.sideBartitle = {
        color: "#413d3d",
        fontSize: "14px",
        fontWeigth:"bold",
        marginBottom: "20px",
        marginTop:"10px",
        marginLeft: "-5px",
        paddingTop:"12px",
        paddingLeft:"20px",
        opacity:"0.7",
        borderLeft:"5px solid "+colorA,
    }

    extendedStyle.sideText = {
        color: "#413d3d",
        fontSize: "10px",
        padding: "5px",
        display:"flex",
        flexDirection: "row",
        width: "160px",
    }

    extendedStyle.Sidefill = {
        color: "#413d3d",
    }

    const styles = StyleSheet.create(extendedStyle);

    useEffect(() => {

        Fonts.map((value, index) => {

            Font.register({
                family: value.name,
                fonts: [{src: value.component}, {src: value.componentbd, fontWeight: "bold"}],
            });

        })

    }, []);

    useEffect(() => {

    }, [props.PdfDataModel]);

    const locales = (text) => {

        const Childtext = text

        if (props.lang == "fr") {
            return Childtext;
        } else {
            const loc = all[props.lang];
            return loc[Childtext.trim()] ? loc[Childtext.trim()] : Childtext;
        }

    }


    const model = { ...props.PdfDataModel.data };


    const Blocks = () =>{

        const model = { ...props.PdfDataModel.data };

        return {
            Competances:(<View>{model.competance.length > 0 &&<Text style={styles.sideBartitle}>{locales("Compétances")}</Text> }
                <Competance style={styles} PdfDataModel={props.PdfDataModel} /></View>),
            Langue:(<View>{model.langue.length > 0 &&<Text style={styles.sideBartitle}>{locales("langues") }</Text> }
                <Language style={styles} PdfDataModel={props.PdfDataModel} /></View>),
            CentreInteret:(<View>{model.centreInteret.length > 0 &&<Text style={styles.sideBartitle}>{locales("Centres d'intérêts")}</Text>}
                <CentreInteret style={styles} PdfDataModel={props.PdfDataModel} /></View>),
            Fromations:( <View style={styles.ExperienceWarp}>
                { model.formation.length > 0 && <Text style={styles.titleSections}>  {locales("Formations")}: </Text> }
                <Formation style={styles} PdfDataModel={props.PdfDataModel} />
            </View>),
            ExperienceProfessionel:(<View style={styles.ExperienceWarp}>
                { model.experienceProfessionel.length > 0 && <Text style={styles.titleSections}> {locales("Expériences professionnelles")} : </Text> }
                <Experience style={styles}  PdfDataModel={props.PdfDataModel} />
            </View>),
            Stage:( <View style={styles.ExperienceWarp}>
                { model.Stages.length > 0 && <Text style={styles.titleSections}> {locales("Stages")} : </Text> }
                <Stage style={styles} PdfDataModel={props.PdfDataModel} />
            </View>)
        }

    }

    const GetBlocks = (block) => {
        const order =  props.PdfDataModel.preference.order;
        const flatblocks = Blocks()
        let orderedBlocks = []
        order[block].forEach((elm,key)=>{
            orderedBlocks[elm.order] = flatblocks[elm.name];
        })
        return orderedBlocks;
    }


    if (typeof props.PdfDataModel == "undefined" || typeof props.lang == "undefined") {

        return <Document>
            <Page wrap="true" size="A4" style={styles.page}>
                <View style={styles.sectionProfil}>
                    <Text>null</Text>
                </View>
            </Page>
        </Document>;

    } else {

        return (
            <Document>

                <Page wrap="true" size="A4" style={styles.page}>

                    <View style={styles.head}>
                        <Image style={styles.images} src={getAvatarImage(props)}/>
                        <Text style={styles.nameWrap}> {getFullname(props)} </Text>
                        <Text style={styles.descriptionWarp}>{getDescription(props)}</Text>

                        <View style={styles.separation}>
                            <SvgRender fill={colorA} style={styles.imagesBg} svgXml={devider}  />
                        </View>
                    </View>

                  <View style={styles.bottom}>

                        <View style={styles.sectionProfil}>

                            <View style={styles.sideBarSection}>

                                <PersonalInformation style={styles} PdfDataModel={props.PdfDataModel} />
                                {GetBlocks("Blok")}

                            </View>

                        </View>

                        <View style={styles.sectionExperience}>

                            <View style={styles.descriptionPosition}>
                                <ProfileDescription PdfDataModel={props.PdfDataModel}/>
                            </View>

                            {GetBlocks("bigBlok")}

                        </View>
                  </View>

                </Page>

            </Document>
        );
    }
};

export default ClassicTemplate;
