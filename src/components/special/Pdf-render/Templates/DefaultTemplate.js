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
import { Fonts } from "./Preferences/Fonts";
import SvgRender from "./PdfComponent/SvgRender"
import {carre} from "./PdfComponent/SvgIcones"
import all from "../../../../locales/all";
import PersonalInformation from "./PdfComponent/sections/PersonalInformation";
import Competance from "./PdfComponent/sections/Competance";
import Language from "./PdfComponent/sections/Language";
import ProfileDescription from "./PdfComponent/sections/ProfileDescription";
import Experience from "./PdfComponent/sections/Experience";
import CentreInteret from "./PdfComponent/sections/CentreInteret";
import Stage from "./PdfComponent/sections/Stage";
import {pdfStyles,pdfStyles_d} from "./PdfComponent/PdfStyles";
import {getFullname,getAvatarImage,getDescription} from "./PdfComponent/pdfContentHelper";
import Formation from "./PdfComponent/sections/Formation";




const DefaultTemplate = (props) => {

  const colorA = (props.PdfDataModel.preference?.Palette?.ColorA != "undefined") ?  props.PdfDataModel.preference?.Palette?.ColorA : "#264653"
  const colorC = (props.PdfDataModel.preference?.Palette?.ColorC != "undefined") ?  props.PdfDataModel.preference?.Palette?.ColorC : "#e9c46a"
  const colorB = (props.PdfDataModel.preference?.Palette?.ColorB != "undefined") ?  props.PdfDataModel.preference?.Palette?.ColorB : "#e9c46a"


  const getPosition = (name) => {
    return  props.PdfDataModel.preference.sectionPostion[name]
}

const  extendStyle  = (extendedStyle,position) => {


  extendedStyle.nameWrap = {
    position: "absolute",
    top: "45px",
    width:"350px",
    padding: "12px",
    fontSize: "28px",
    borderRadius: "5px",
    textAlign: "center",
    display: "flex",
    paddingRight: "5px",
    alignSelf: "center",
    flexDirection: 'row',
    height:"120px",
    zIndex:"20",
    color: colorA
  }

  extendedStyle.sectionProfil = {
        backgroundColor: colorB,
        borderRight:"1px solid "+colorA,
        minHeight: "100%",
        width: "39%",
        display: "flex",
        flexDirection: "row",
        paddingTop: "220px",
        zIndex:"15",
        position:"relative"
  }

  extendedStyle.imagesBg = {
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex:"10",
        opacity:"0.5"
  }
  extendedStyle.images = {
        width: "160px",
        height: "160px",
        position: "absolute",
        top: "30px",
        left: "30px",
        zIndex:"1",
   }

  extendedStyle.sectionExperience = {
        backgroundColor: "transparent",
        padding: "20px",
        paddingTop: "180px",
        width: "61%",
        minHeight: "100%",
        position:"relative",
        zIndex:"20",
  }

    extendedStyle.descriptionWarp =  {
        position: "absolute",
        top: "85px",
        padding: "16px",
        textAlign: "center",
        width:"300px",
        alignSelf: "center",
        fontSize: "14px",
        color: "#3d3a3a"
    }

 
return StyleSheet.create(extendedStyle);

}

const getStyle = (position) => {
if(position=="g"){
   return  extendStyle(pdfStyles(props),position) 
}else{
    return  extendStyle(pdfStyles_d(props),position) 
}
}

const styles  = getStyle("g")


  useEffect(() => {

    Fonts.map((value,index)=>{

      Font.register({
        family: value.name,
        fonts: [{ src: value.component }, { src: value.componentbd, fontWeight: "bold" }],
      });

    })

  } , []);

  useEffect(() => {

  }, [props.PdfDataModel]);

  const locales = (text) => {

    const Childtext = text

    if(props.lang == "fr"){
      return Childtext;
    }else{
      const loc =all[props.lang];
      return loc[Childtext.trim()] ? loc[Childtext.trim()] : Childtext;
    }

  }

    const model = { ...props.PdfDataModel.data };

    const Blocks = () =>{

      const model = { ...props.PdfDataModel.data };

      return {
          Competances:(<View >{model.competance.length > 0 &&<Text style={getStyle(getPosition("Competances")).sideBartitle}>{locales("Compétances")}</Text>}
              <Competance PdfDataModel={props.PdfDataModel} /></View>),

           Langue:(<View >{model.langue.length > 0 &&<Text style={getStyle(getPosition("Langue")).sideBartitle}>{locales("langues") }</Text>}
              <Language  PdfDataModel={props.PdfDataModel} /></View>),

          CentreInteret:(<View >{model.centreInteret.length > 0 &&<Text style={getStyle(getPosition("CentreInteret")).sideBartitle}>{locales("Centres d'intérêts")}</Text>}
              <CentreInteret  PdfDataModel={props.PdfDataModel} /></View>),

          Fromations:(<View style={getStyle(getPosition("Fromations")).ExperienceWarp}>
              {model.formation.length > 0 &&<Text style={getStyle(getPosition("Fromations")).titleSections}>  {locales("Formations")}: </Text>}
              <Formation  PdfDataModel={props.PdfDataModel} />
          </View>),

          ExperienceProfessionel:(<View style={getStyle(getPosition("ExperienceProfessionel")).ExperienceWarp}>
              {model.experienceProfessionel.length > 0 &&<Text style={getStyle(getPosition("ExperienceProfessionel")).titleSections}> {locales("Expériences professionnelles")} : </Text>}
              <Experience  PdfDataModel={props.PdfDataModel} />
          </View>),

          Stage:(<View style={getStyle(getPosition("Stage")).ExperienceWarp}>
              {model.Stages.length > 0 &&<Text style={getStyle(getPosition("Stage")).titleSections}> {locales("Stages")} : </Text>}
              <Stage PdfDataModel={props.PdfDataModel} />
          </View>)
      }
  }
  
   
    const GetBlocks = (positon) => {

      let blocks = ["bigBlok","Blok"];
      let orderedBlocks = []
      let orderShift = 0
      blocks.forEach((block)=>{
          const order =  props.PdfDataModel.preference.order;
          const position =  props.PdfDataModel.preference.sectionPostion;
          const flatblocks = Blocks()
          console.log("flat",flatblocks);
           order[block].forEach((elm,key)=>{
               if(position[elm.name] == positon){
                 orderedBlocks[parseInt(elm.order)+orderShift] = flatblocks[elm.name];
               }
           })
           orderShift += 3
      })
      return orderedBlocks;
  }

  if (typeof props.PdfDataModel == "undefined" || typeof  props.lang == "undefined") {

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

            <View style={styles.sectionProfil}>

              <SvgRender fill={colorC} style={styles.imagesBg} svgXml={carre}  />
              <Image style={styles.images} src={getAvatarImage(props)} />

                <View style={styles.sideBarSection}>

                    <PersonalInformation PdfDataModel={props.PdfDataModel} />
                    {GetBlocks("g")}

                </View>

            </View>

            <View style={styles.sectionExperience}>

              <Text style={styles.nameWrap} > {getFullname(props)} </Text>
              <Text style={styles.descriptionWarp} >{getDescription(props)}</Text>
              <ProfileDescription PdfDataModel={props.PdfDataModel}   />

                {GetBlocks("d")}

            </View>

          </Page>

        </Document>
    );
  }
};

export default DefaultTemplate;
