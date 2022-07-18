import React, { useContext, useEffect } from "react";
import AuthService from "../../services/auth.service";
import { useLocation, useHistory } from "react-router-dom";
import { Person, Flag } from "@mui/icons-material";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavItem , Collapse} from "reactstrap";
import L from "../../locale";
import { LanguageContext } from "../../localeContext";
import LangPicker from "../special/Helper-component/LangPicker";

const FrontNavBar = (props) => {
  const [stepCount, setStepCount] = React.useState(1);
  const location = useLocation();
  const history = useHistory();
  const [lang, setLang] = useContext(LanguageContext);
  const [collapsed, setCollapsed] = React.useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openUserMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    switch (action) {
      case "logout":
        logout();
        break;
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/app/user-information":
        setStepCount(1);
        break;
      case "/app/template":
        setStepCount(2);
        break;
      case "/app/publication":
        setStepCount(3);
        break;
    }
  }, [location]);

  const handleStepClick = (step) => {
    switch (step) {
      case 1:
        history.push("/app/user-information");
        break;
      case 2:
        history.push("/app/template");
        break;
      case 3:
        history.push("/app/publication");
        break;
    }
  };

  const logout = (e) => {
    AuthService.logout();
  };

  const getClass = (step) => {
    let classess = "stepperIcone";
    if (stepCount == step) {
      classess += " activeStep";
    }

    return classess;
  };

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img
            className="ml-1  cviotek-logo"
            alt="..."
            src={require("../../assets/img/brand/logo.png").default}
          />
        </NavbarBrand>

        <NavbarToggler
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="mr-auto ml-2" navbar>
            <NavItem>
              <div className="StepItemContainer">
                <div
                  onClick={() => {
                    handleStepClick(1);
                  }}
                  className={getClass(1)}
                >
                  <Person />
                </div>
                <div className="stepTitle">
                  {" "}
                  <L> Mes CVs </L>{" "}
                </div>
              </div>
            </NavItem>
            <NavItem>
              <div className="StepItemContainer">
                <div
                  onClick={() => {
                    //handleStepClick(2);
                  }}
                  className={getClass(2)}
                >
                  <Flag />
                </div>{" "}
                <div className="stepTitle">
                  {" "}
                  <L> Création </L>{" "}
                </div>
              </div>
            </NavItem>
            </Nav>
            <Nav className="ml-auto ml-2" navbar>
            <NavItem>
              <div className="StepItemContainer">
                <LangPicker setLanguage={(lang) => setLang(lang)} />
              </div>
            </NavItem>

            <NavItem>
              <Avatar
                onClick={handleClick}
                style={{margin:"10px 20px"}}
                name="Souheyeb"
                className="mr-1"
              />

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
                  Logout
                </MenuItem>
              </Menu>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default FrontNavBar;
