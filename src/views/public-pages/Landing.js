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
import { Adsense } from "@ctrl/react-adsense";
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
import { usePageTracking } from "hooks/usePageTracking";
import authService from "services/auth.service";
import { Avatar, Menu, MenuItem } from "@mui/material";

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
  let Tracker = usePageTracking();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openUserMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (props.match.params?.lang) {
      if (typeof all[props.match.params?.lang] != "undefined") {
        setLang(props.match.params?.lang);
      } else {
        setLang("fr");
      }
    }

      fetchJsFromCDN('https://www.ezojs.com/ezoic/sa.min.js', ['ezstandalone']).then(([ezstandalone]) => {
      ezstandalone.define(131,132);
        if (!ezstandalone.enabled) {
          ezstandalone.enable();
          ezstandalone.display();
        }
        else {
          ezstandalone.refresh();
        }
      })  

    const int = setInterval(() => {
      setTik((Tik) => Tik + 1);
    }, 5000);
    return () => {
      clearInterval(int);
    };
  }, []);

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const getUserName = () => {
    let user = authService.getCurrentUser();
    user = JSON.parse(user);
    return user?.name[0];
  };

  const isConnected = () => {
    console.log(getUserName());
    return authService.isLoggedIn();
  };

  const logout = (e) => {
    window.gtag("event", "Déconnection");
    authService.logout(false);
  };


  const goToCv = () => {
    history.push("/app/user-information");
  }

  const handleClose = (action) => {
    switch (action) {
      case "logout":
        logout();
        break;
        case "cv" : 
        goToCv();
        break;
    }
    setAnchorEl(null);
  };

  const fetchJsFromCDN = (src, externals = []) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.setAttribute("src", src);
      script.addEventListener("load", () => {
        resolve(
          externals.map((key) => {
            const ext = window[key];
            typeof ext === "undefined" &&
              console.warn(`No external named '${key}' in window`);
            return ext;
          })
        );
      });
      script.addEventListener("error", reject);
      document.body.appendChild(script);
    });
  };

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
              window.gtag("event", "Affichage menu mobile");
              setCollapsed(!collapsed);
            }}
          />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="mr-auto ml-2" navbar>
              <NavItem>
                <LangPicker
                  landing={true}
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

              {isConnected() ? (
                <NavItem>
                 <NavLink onClick={(e) =>{ e.preventDefault() ; handleClose("cv")}} href="#">
                   <L>Mes CV</L>
                 </NavLink>
               </NavItem>
              ) : <></>}

              {!isConnected() ? (
                <>
                  <NavItem>
                    <NavLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.gtag("event", "Click sur Enregistrement");
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
                        window.gtag("event", "Click sur Connection");
                        history.push("/auth/login");
                      }}
                    >
                      <L>Connection</L>
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <NavItem>
                  <Avatar
                    onClick={handleClick}
                    style={{ margin: "10px 40px", right: "20px" }}
                    name="Souheyeb"
                    className="mr-1"
                  >
                    {" "}
                    {getUserName()}{" "}
                  </Avatar>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openUserMenu}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={() => handleClose("logout")}>
                    <L>Déconnection</L> 
                    </MenuItem>
                  
                  </Menu>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>

        <div class="center_add">
           <div id="ezoic-pub-ad-placeholder-131"> </div>
        </div>

        <div className="row">
          <div className="col-md-12 p-5">
            <Fade right>
              <div className="col-md-12 text-center p-5 mb-5">
                <h1 className="h1_warpe">
                  <L>
                     CVIOTEK APP – Créez votre CV gratuit en ligne 
                  </L>
                </h1>
              </div>
            </Fade>

            <div className="col-md-8 offset-md-2">
              <Fade top cascade>
                <div className="d-flex justify-content-around flex-wrap">
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
            <Fade bottom>
              <div className="row">
                <div className="col-md-12  text-center">
                  <a
                    className="cv_link"
                    onClick={(e) => {
                      e.preventDefault();
                      window.gtag("event", "Click sur Créez votre CV");
                      history.push("/auth/login");
                    }}
                    href={"/auth/login/" + lang}
                  >
                    <L> Créez votre CV </L>
                  </a>
                </div>
              </div>
            </Fade>
          </div>

          <Fade right>
            <div className="col-md-12 text-center p-5">
              <div className="creation_cv">
                <div style={leftStyle} className="cv_carrousel">
                  {getImages()}
                </div>
              </div>
            </div>
          </Fade>

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
                      <L>Simple</L>{" "}
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
                      <DashboardCustomizeIcon
                        style={{ fontSize: "54px" }}
                      />{" "}
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
                      Avec votre Pc ou Smartphone, vous pouvez créer un CV
                      gratuit sur notre site et le télécharger au format PDF
                      quelle que soit votre situation
                    </L>
                  </h1>
                </div>

                <div className="col-md-4  text-center">
                  <a
                    className="cv_link"
                    onClick={(e) => {
                      e.preventDefault();
                      window.gtag("event", "Click sur Un Cv étudiant");
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
                      window.gtag("event", "Click sur Un premier emploi");
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
                      window.gtag("event", "Click sur  Avec expérience");
                      history.push("/auth/login");
                    }}
                    href={"/auth/login/" + lang}
                  >
                    <L> Avec expérience </L>
                  </a>
                </div>
              </div>
            </Fade>
          </div>

          <Fade bottom cascade>
            <div className="col-md-12 p-5">
              <div className="row">
                <div className="col-md-12">
                  <div className="cv_description">
                    <L>
                      Avec notre application CVIOTEK APP, vous pouvez faire
                      votre CV gratuitement en ligne. En plus, vous pouvez créer
                      2 ou 3 CV. Par ailleurs, une fois que vous avez fini votre
                      CV, vous pouvez le télécharger facilement et rapidement au
                      format PDF sur votre PC ou sur votre téléphone
                      gratuitement. Vous êtes un demandeur d’emploi avec ou sans
                      expérience qui a besoin d’un CV ? Vous êtes un étudiant
                      qui a besoin d’un CV pour une inscription dans une
                      université, une bourse d’étude, un stage ou un job
                      étudiant ? Avec quelques clics, faites votre CV gratuit en
                      ligne rapidement et faites le téléchargement en PDF.
                    </L>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>

      <div class="center_add">
         <div id="ezoic-pub-ad-placeholder-132"> </div>
      </div>

      <AuthFooter />
    </>
  );
};

export default Landing;
