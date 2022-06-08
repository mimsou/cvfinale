import React, {useState, useEffect, useCallback} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import pdfjsWorker from "react-pdf/dist/esm/pdf.worker.entry";
import {usePDF} from "@react-pdf/renderer";
import { getPreference } from "hooks/preferences";
import noData from "react-pdf/dist/umd/Document";

const PdfViewer = (props) => {

    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    const [numPages, setNumPages] = useState(null);

    const [instance, updateInstance] = usePDF({
        document: React.cloneElement(getPreference(props.PdfData.preference).Template.tamplate, {
            PdfDataModel: props.PdfData,
            lang:props.lang
        }),
    });


    useEffect(() => {

        const Prefs = getPreference(props.PdfData.preference)

        updateInstance({
            document: React.cloneElement(Prefs.Template.tamplate, {
                PdfDataModel: props.PdfData,
                lang:props.lang
            }),
        })

    }, [props.PdfData]);

    useEffect(() => {

        if (typeof props.setUrlDownload != "undefined" && instance?.url)
            props.setUrlDownload(instance?.url);

    }, [instance]);

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    const getPages = () => {

        if (props.mode != "T") {

            let pagearray = [];

            for (let i = 1; i < numPages + 1; i++) {
                pagearray.push(
                    <Page key={i} className="PdfPages" scale={props.scale ? props.scale : 0} pageNumber={i}/>
                );
            }

            return pagearray;

        } else {
            return <Page key={1} className="PdfPages" scale={props.scale ? props.scale : 0} pageNumber={1}/>;
        }
    };

    if (instance.loading) return <div className="loadingPdf">...</div>;

    if (instance.error) return <div>Document non chargé: {"error"}</div>;

    return (
        <>
            <Document
                loading={false}
                file={instance.url}
                noData={false}
                onLoadSuccess={onDocumentLoadSuccess}
            >  
                {getPages()}
            </Document>  
        </>
    );
};

export default PdfViewer;
