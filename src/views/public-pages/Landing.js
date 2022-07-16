import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/landing.css";
import logo from "../../assets/img/brand/logo.png";
import image from "../../components/special/Pdf-render/Templates/images/creation_cv.jpg";
import image_a from "../../components/special/Pdf-render/Templates/images/creation_cv_2.jpg";
import image_b from "../../components/special/Pdf-render/Templates/images/creation_cv_3.jpg";
import L from "../../locale";
import LangPicker from "../../components/special/Helper-component/LangPicker";
import { LanguageContext } from "../../localeContext";
import convertPdfToImages from "../../components/special/Helper-component/PdfAsImage";
import userService from "../../services/user.service";
import { useHistory } from "react-router-dom";
import AuthFooter from "components/Footers/AuthFooter.js";
import all from "locales/all";
import SavingsIcon from "@mui/icons-material/Savings";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { TouchApp } from "@mui/icons-material";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import Filter3Icon from "@mui/icons-material/Filter3";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import Fade from "react-reveal/Fade";

const Landing = (props) => {
  document.body.style.backgroundColor = "#ebf2f6";
  document.title = "Cviotek votre Cv en ligne gratuit";
  const [collapsed, setCollapsed] = useState(true);
  const [lang, setLang] = useContext(LanguageContext);
  const [Tik, setTik] = useState(0);
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(0);
  const [leftStyle, setleftStyle] = useState({ left: "0vh" });
  const [stepAnimation, setStepAnimation] = useState(50);

  let history = useHistory();

  useEffect(() => {
    console.log(props.match.params?.lang);
    if (props.match.params?.lang) {
      if (typeof all[props.match.params?.lang] != "undefined") {
        setLang(props.match.params?.lang);
      } else {
        setLang("fr");
      }
    }

    const int = setInterval(() => {
      setTik((Tik) => Tik + 1);
    }, 5000);
    return () => {
      clearInterval(int);
    };
  }, []);

  useEffect(() => {
    const count = getImages().length;
    if (index + 1 >= count) {
      setIndex(0);
      setPos(0);
      setleftStyle({ left: "0vh" });
    } else {
      setIndex(index + 1);
      let position = parseInt(pos) - parseInt(stepAnimation);
      setPos(position);
      const literal = position + "vh";
      setleftStyle({ left: literal });
    }
  }, [Tik]);

  const getImages = () => {
    return [
      <img className="cv_images" src={image} />,
      <img className="cv_images" src={image_a} />,
      <img className="cv_images" src={image_b} />,
    ];
  };

  return (
    <>
      <div className="landing-main">
        <div className="upper_text">
          {" "}
          <L>CV en ligne</L>{" "}
        </div>

        <Navbar color="light" expand="md" light>
          <NavbarBrand href="/">
            <img className="logo-img" src={logo} />
          </NavbarBrand>
          <NavbarToggler
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="mr-auto ml-2" navbar>
              <NavItem>
                <LangPicker
                  className="lang-selection"
                  setLanguage={(lang) => setLang(lang)}
                />
              </NavItem>
            </Nav>
            <Nav className="ml-auto ml-2" navbar>
              <NavItem>
                <NavLink href="https://app.cviotek.com/">
                  <L>Accueil</L>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.cviotek.com/">
                  <L>Blog</L>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/auth/registration");
                  }}
                >
                  <L>Enregistrement</L>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/auth/login");
                  }}
                >
                  <L>Connection</L>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <div className="row">
          <div className="col-md-12 mt-5 p-5">
          <Fade right>
            <div className="col-md-12 text-center p-5 mb-5">
              <h1 className="h1_warpe">
                <L>
                  Avec CVIOTEK APP , Créez votre Cv gratuitement en ligne en
                  quelques clics
                </L>
              </h1>
            </div>
           </Fade>
           
            <div className="col-md-8 offset-md-2">
            <Fade top cascade>
              <div className="d-flex justify-content-between flex-wrap">
                <div className="cv-steps ">
                  <div className="step_number"> 1 </div>
                  <div className="step_description">
                    {" "}
                    <L>Créez un compte</L>{" "}
                  </div>
                  <div className="hexagon">
                    <span></span>
                  </div>
                </div>

                <div className="cv-steps">
                  <div className="step_number"> 2 </div>
                  <div className="step_description">
                    {" "}
                    <L>Inserez vos données</L>{" "}
                  </div>
                  <div className="hexagon">
                    <span></span>
                  </div>
                </div>

                <div className="cv-steps">
                  <div className="step_number"> 3 </div>
                  <div className="step_description">
                    {" "}
                    <L>Téléchargez votre cv en PDF</L>{" "}
                  </div>
                  <div className="hexagon">
                    <span></span>
                  </div>
                </div>
              </div>
              </Fade>
            </div>
           
          </div>

          <div className="col-md-12 p-5">

          <Fade left>
            <div className="col-md-12 text-center  p-5 mb-5">
              <h2 className="h1_warpe">
                <L>Les 5 principaux avantages de CVIOTEK APP</L>
              </h2>
            </div>
           </Fade>

          
            <div className="col-md-8 offset-md-2">
            <Fade right cascade>
              <div className="d-flex justify-content-center flex-wrap">
                <div className="cv-steps ">
                  <div className="step_icone">
                    {" "}
                    <SavingsIcon style={{ fontSize: "54px" }} />{" "}
                  </div>
                  <div className="step_description_icone">
                    {" "}
                    <L>C'est gratuit</L>{" "}
                  </div>
                  <div className="circle">
                    <span></span>
                  </div>
                </div>

                <div className="cv-steps ">
                  <div className="step_icone">
                    {" "}
                    <TouchApp style={{ fontSize: "54px" }} />{" "}
                  </div>
                  <div className="step_description_icone">
                    {" "}
                    <L>Trop Simple</L>{" "}
                  </div>
                  <div className="circle">
                    <span></span>
                  </div>
                </div>

                <div className="cv-steps ">
                  <div className="step_icone">
                    {" "}
                    <FollowTheSignsIcon style={{ fontSize: "54px" }} />{" "}
                  </div>
                  <div className="step_description_icone">
                    {" "}
                    <L>Facile à utiliser</L>{" "}
                  </div>
                  <div className="circle">
                    <span></span>
                  </div>
                </div>

                <div className="cv-steps ">
                  <div className="step_icone">
                    {" "}
                    <Filter3Icon style={{ fontSize: "54px" }} />{" "}
                  </div>
                  <div className="step_description_icone">
                    {" "}
                    <L>Jusqu'à 3CV</L>{" "}
                  </div>
                  <div className="circle">
                    <span></span>
                  </div>
                </div>

                <div className="cv-steps ">
                  <div className="step_icone">
                    {" "}
                    <DashboardCustomizeIcon style={{ fontSize: "54px" }} />{" "}
                  </div>
                  <div className="step_description_icone">
                    {" "}
                    <L>Cv personnalisable</L>{" "}
                  </div>
                  <div className="circle">
                    <span></span>
                  </div>
                </div>
              </div>
              </Fade>
            </div>
          

          </div>

          <div className="col-md-12 p-5">
          <Fade right cascade>
            <div className="row">

           
            <div className="col-md-12 text-center p-5 mb-5">
              <h1 className="h1_warpe">
                <L>
                  Avec CVIOTEK APP , Créez votre Cv gratuitement en ligne en
                  quelques clics
                </L>
              </h1>
            </div>
           
           
              <div className="col-md-4  text-center">
                <a
                  className="cv_link"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/auth/login");
                  }}
                  href={"/auth/login/" + lang}
                >
                  <L> Un Cv étudiant </L>
                </a>
              </div>

              <div className="col-md-4  text-center">
                <a
                  className="cv_link"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/auth/login");
                  }}
                  href={"/auth/login/" + lang}
                >
                  <L> Un premier emploi </L>
                </a>
              </div>

              <div className="col-md-4  text-center">
                <a
                  className="cv_link"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/auth/login");
                  }}
                  href={"/auth/login/" + lang}
                >
                  <L> Vous avez de l'expérience </L>
                </a>
              </div>
            </div>
            </Fade>
          </div>

          <Fade bottom cascade>
          <div className="col-md-12 text-center p-5">
            <div className="creation_cv">
              <div style={leftStyle} className="cv_carrousel">
                {getImages()}
              </div>
            </div>
          </div>
         
          <div className="col-md-12 p-5">
            <div className="row">
              <div className="col-md-12">
                <div className="cv_description">
                  <L>
                    Avec notre application CVIOTEK APP, vous pouvez faire votre
                    CV gratuitement en ligne. En plus, vous pouvez créer 2 ou 3
                    CV. Par ailleurs, une fois que vous avez fini votre CV, vous
                    pouvez le télécharger facilement et rapidement au format PDF
                    sur votre PC ou sur votre téléphone gratuitement. Vous êtes
                    un demandeur d’emploi avec ou sans expérience qui a besoin
                    d’un CV ? Vous êtes un étudiant qui a besoin d’un CV pour
                    une inscription dans une université, une bourse d’étude, un
                    stage ou un job étudiant ? Avec quelques clics, faites votre
                    CV gratuit en ligne rapidement et faites le téléchargement
                    en PDF.
                  </L>
                </div>
              </div>
            </div>
          </div>
          </Fade>
        </div>
      </div>
      <AuthFooter />
    </>
  );
};

export default Landing;
