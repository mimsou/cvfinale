import Associative from "./Associative";
import CentreInteret from "./CentreInteret";
import Competances from "./Competances";
import ExperienceProfessionel from "./ExperienceProfessionel";
import Fromations from "./Fromations";
import Langue from "./Langue";
import ProfilePersonel from "./ProfilePersonel";
import DescriptionProfil from "./DescriptionProfil";
import Stages from "./Stages";
import L from "locale";

const Sections = [
    {

        name:"ProfilePersonel",
        fullName:"Donnée personelle",
        active:true,
        component: <ProfilePersonel />
    },
    {
        name:"DescriptionProfil",
        fullName:"Présentation générale",
        active:true,
        component: <DescriptionProfil />
    },

    {

        name:"Fromations",
        fullName:"Formations",
        active:true,
        component: <Fromations />
    },
    {
        name:"ExperienceProfessionel",
        fullName:"Expériences",
        active:true,
        component:<ExperienceProfessionel />
    },

    {
        name:"Stage",
        fullName:"Stages",
        active:true,
        component:<Stages />
    },
   
  
    {
        name:"Competances",
        fullName:"Compétences",
        active:true,
        component: <Competances />
    },
    {
        name:"Langue",
        fullName:"Langues",
        active:true,
        component: <Langue />
    },
    {
        name:"CentreInteret",
        fullName:"Centres d'intérêt",
        active:true,
        component: <CentreInteret />
    }
     
]

export default Sections;