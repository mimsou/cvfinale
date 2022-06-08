import DefaultTemplate from "./Templates/DefaultTemplate";
import ClassicTemplate from "./Templates/ClassicTemplate";

const PdfTemplates = [
    
    {
        name:"DefaultTemplate",
        active:false,
        tamplate: <DefaultTemplate /> ,
        comp: DefaultTemplate
    },
    {
        name:"ClassicTemplate",
        active:false,
        tamplate: <ClassicTemplate /> ,
        comp: ClassicTemplate
    },
]

export default PdfTemplates;