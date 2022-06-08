export  const pdfStyles = (props) => {

    const colorA = (props.PdfDataModel.preference?.Palette?.ColorA != "undefined") ?  props.PdfDataModel.preference?.Palette?.ColorA : "#264653"
    const colorC = (props.PdfDataModel.preference?.Palette?.ColorC != "undefined") ?  props.PdfDataModel.preference?.Palette?.ColorC : "#e9c46a"
    const colorB = (props.PdfDataModel.preference?.Palette?.ColorB != "undefined") ?  props.PdfDataModel.preference?.Palette?.ColorB : "#e9c46a"

   return {
        inlineIconeText:{
                 marginLeft:"10px",
                display:"flex",
                flexDirection: "row",
                color:"#fff"
        },
        Inlinetext:{
            display: "flex",
                flexDirection: "row",
                width: "140px",
        },
        page: {
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "row",
                fontFamily: props.PdfDataModel.preference?.Font?.name,
        },
        titleSections: {
            margin: "15px",
                color:"#5e5e5e"
        },
        sectionProfil: {

                backgroundColor: colorA,
                minHeight: "100%",
                width: "39%",
                display: "flex",
                flexDirection: "row",
                paddingTop: "40px",
                zIndex:"15",
                position:"relative"
        },
        sectionExperience: {
                backgroundColor: "transparent",
                padding: "20px",
                paddingTop: "30px",
                width: "61%",
                minHeight: "100%",
                position:"relative",
                zIndex:"20",
        },
        imagesBg: {
                position: "absolute",
                top: "-151px",
                left: "-40px",
                zIndex:"10",
        } ,
        images: {
            width: "130px",
                height: "130px",
                borderRadius: "50%",
                position: "absolute",
                top: "40px",
                left: "207px",
                zIndex:"1",
        } ,
        sideBarSection: {
            padding: "5px",
                lineHeight: "2",
        },
        sideBartitle: {
                color: colorC,
                display:"list-item",
                fontSize: "14px",
                marginBottom: "0px",
                paddingTop:"10px",
                marginTop:"20px",
                marginLeft:"-5px",
                fontWeight:"bold",
                paddingLeft:"20px",
                borderBottomRightRadius:"20%",
                borderTopRightRadius:"20%",
                borderLeft:"2px solid #FFFFFF"
        },
        ratingDot:{
          fill: colorC
        },
        sideText: {
                color: "#FFFFFF",
                fontSize: "10px",
                padding: "5px",
                display:"flex",
                flexDirection: "row",
                width: "170px",
        },
        ExperienceWarp: {
            display: "block",
                paddingTop: "2px",
                paddingLeft: "10px",
        },
        nameWrap: {
                position: "absolute",
                top: "60px",
                width:"450px",
                padding: "12px",
                paddingTop:"20px",
                paddingLeft:"100px",
                fontSize: "28px",
                backgroundColor: colorB,
                borderRadius: "5px",
                textAlign: "center",
                display: "flex",
                paddingRight: "5px",
                alignSelf: "center",
                flexDirection: 'row',
                height:"120px",
                zIndex:"20",
                color: colorC
        },
        descriptionWarp:{
            position: "absolute",
                top: "115px",
                padding: "12px",
                paddingLeft:"100px",
                textAlign: "center",
                width:"300px",
                alignSelf: "center",
                fontSize: "18px",
                color: colorC
        }
        ,descriptionText:{
            fontSize:"12px",
            textAlign:"center",
            alignSelf: "center",
            color:"#5e5e5e"
         },
       maincontainer: {
           display: "flex",
           flexDirection: "row",
           width: "300px",
           marginLeft:"-5px",
          
       },
       container: {
           display: "flex",
           flexDirection: "row",
           width: "150px",
       },
       circle: {
           margin: "1px",
           marginTop: "10px",
           width: "10px",
           height: "10px",
       },
       Sidefill:{
           color: "#FFFFFF",
       }
    }
}