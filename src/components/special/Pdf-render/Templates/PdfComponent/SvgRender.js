import {useMemo, createElement, useEffect, useState} from "react";
import { parse, TextNode, ElementNode, RootNode } from "svg-parser";
import * as CSSJSON  from "cssjson";
import {
    View
} from "@react-pdf/renderer";


const  SvgRender = (props) => {

    const [st,setSt] = useState(props.fill)
    const [stroke,setStroke] = useState(props.stroke)

    useEffect(()=>{
        setSt(props.fill);
    },[props.fill])

    const supportedStyleProps = [
        "color",
        "dominantBaseline",
        "fill",
        "fillOpacity",
        "fillRule",
        "opacity",
        "stroke",
        "strokeWidth",
        "strokeOpacity",
        "strokeLinecap",
        "strokeDasharray",
        "transform",
        "textAnchor",
        "visibility"
    ]

    function isElementNode(node) {
        return node.type === 'element'
    }

    function removeLineBreaks(text) {
        if (typeof text === 'string') {

            return text.replace(/(\r\n|\n|\r)/gm, "")
        }

        return text;
    }

    const formatStringToCamelCase = (str) => {
        const splitted = str.split("-");
        if (splitted.length === 1) return splitted[0];
        return (
            splitted[0] +
            splitted
                .slice(1)
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join("")
        );
    };

    const getStyleObjectFromString = (str) => {
        const style = {};
        if (!str) return {};

        str.split(";").forEach((el) => {
            let [property, value] = el.split(":");
            if (!property) return;
            if (property === "cursor") return;
            const formattedProperty = formatStringToCamelCase(property.trim());
            if (supportedStyleProps.includes(formattedProperty)) {
                if(formattedProperty === "strokeDasharray"){
                    value = value.replace(/pt/g, "") //dasharray has now px
                }
                style[formattedProperty] = value.trim();
            }
        });

        return style;
    };

    function handleRelativePositioning(node, parentX, parentY) {

        return {
            x: (Number(node.properties?.x ?? parentX ?? 0)) + Number(node.properties?.dx ?? 0),
            y: (Number(node.properties?.y ?? parentY ?? 0)) + Number(node.properties?.dy ?? 0)
        };
    }

    function getParentPosition(pos) {
        if (!pos) return 0;
        if (typeof pos === 'string') return Number(pos);
        return pos;
    }

    function getStyleObjectFromClass(Nodeclass,classList){

        let style = {}

        Nodeclass.split(' ').forEach((ClassStrA)=>{
                let  i = 0;

               Object.keys(classList).forEach((ClassStrB)=>{
                   const ClassStrBSanitise =  ClassStrB.replace(".","")
                  if(ClassStrBSanitise == ClassStrA){
                      style = classList[ClassStrB];
                  }
               })


        })

        return style;

    }

    function svgToJSXWithRelPositioning(node , key, parentX , parentY , styledef= false){

        let StyleDef = []
        if(styledef){
           StyleDef = styledef;
         }

        if (typeof node === 'string') {
            return removeLineBreaks(node);
        }
        if (!isElementNode(node)) {
            return removeLineBreaks(node.value);
        }
        const elementName = node.tagName;
        if (!elementName) {

            return null;
        }

        let componentProps;


        if (node.tagName === 'desc') {

            return null ;
        }


        if( node.tagName === 'defs'){
             node.children.forEach((elms)=>{
               elms.children.forEach(
                   (elm)=>{

                       if(elm.value){
                           let jsonelm = CSSJSON.toJSON(elm.value).children;
                           StyleDef[Object.keys(jsonelm)] = Object.values(jsonelm)[0].attributes;

                       }
                   }
               )
            })
            return null ;
        }

        if (node.properties !== undefined) {


            if (node.tagName === "text" || node.tagName === "tspan" || node.tagName === "rect") {
                componentProps = handleRelativePositioning(node, parentX, parentY);
                if(node.tagName !== "rect"){
                    componentProps = {
                        ...componentProps,
                        textAnchor: node.properties['text-anchor']
                    }
                }else{
                    componentProps = {
                        ...node.properties,
                        ...componentProps,
                    }
                }
            }else{
                componentProps = node.properties;
            }

            if(node.properties["class"]){
                componentProps = {
                    ...componentProps,
                    style: getStyleObjectFromClass(node.properties["class"] , StyleDef)
                }
            }else{
                let elmfill = "";
                if(st){
                    elmfill = st;
                }

                let elmstroke = "";
                if(st){
                    elmstroke = stroke;
                }
                componentProps = {
                    ...componentProps,
                    style:  {fill: elmfill,stroke:elmstroke}
                }
            }

            if( node.tagName === 'svg'){

                if (props.style){
                    if(props.style.width){
                        componentProps = {
                            ...componentProps,
                            width: props.style.width
                        }
                    }

                    if(props.style.height){
                        componentProps = {
                            ...componentProps,
                            height: props.style.height
                        }
                    }
                }
            }

            if (node.properties.style) {

                componentProps = {
                    ...componentProps,
                    style: getStyleObjectFromString(node.properties.style)
                }
            }
        }
        let children = [];
        if (node.children && node.children.length > 0) {
            children = node.children.map(
                (childNode , i ) =>
                    svgToJSXWithRelPositioning(
                        childNode, key+"-"+i, getParentPosition(node.properties.x), getParentPosition(node.properties.y) , StyleDef
                    )
            )
        }else{
            children = [""]
        }
        componentProps = {...componentProps, key: key ?? "root"};
        return createElement(elementName.toUpperCase(), componentProps, children);
    }

    const svgElement = useMemo(() => {
        if (!props.svgXml || props.svgXml === "") return <></>;
        const svg = props.svgXml.replace(/px/g, "pt");
        const parsed = parse(svg);
        return svgToJSXWithRelPositioning(parsed.children[0]);
    }, [props.svgXml , st ,stroke]);

    return <View style={props?.style ? props.style : {}}>{svgElement}</View>;
}

export default SvgRender;
