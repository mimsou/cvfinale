import React, { useContext, useState } from "react";

import AuthService from "../../services/auth.service";

import { useInput } from "hooks/inputHook";

import { useHistory } from "react-router-dom";

import FacebookLogin from "react-facebook-login";

import GoogleLogin from "react-google-login";

import LangPicker from "components/special/Helper-component/LangPicker";

import L from "locale";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { LanguageContext } from "localeContext";

const Login = (props) => {


  const responseFacebook = (response) => {

    this.signup(response, "facebook");
  };

  const responseGoogle = (googleResponse) => {
    if (googleResponse.type !== "error") {
      AuthService.loginWithGoogle(googleResponse.accessToken).then(
            (reponse) => {
              if (AuthService.isLoggedIn()) {
                AuthService.getUserProfile().then((resp)=>{
                  localStorage.setItem("user_info", JSON.stringify(resp.data));
                  props.history.push("/app/user-information");
                })
              }
            }
      );

    }
  };

  let history = useHistory();

  const getToRegistration = () => {
    history.push("/auth/registration");
  };

  const { value: login, bind: bindLogin, reset: resetLogin } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(login, password).then(
      () => {
        if (AuthService.isLoggedIn()) {
            props.history.push("/app/user-information");
          }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };

  const [lang, setLang] = useContext(LanguageContext);

  return (
    <>
    <Col md="12">
    <LangPicker className="lang-selection-auth"  setLanguage={(lang)=>setLang(lang)}  />
    </Col>
      <Col lg="5" md="7">
        <Card className="shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
               <small><L>Se connecter avec</L></small>
            </div>
            <div className="btn-wrapper text-center">
              <GoogleLogin
                clientId="473731290302-jvn3aofq30c3h98ln2rb70499gkgqnn3.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={(e)=>responseGoogle(e)}
                onFailure={(e)=>responseGoogle(e)}
              />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Connection</small>
            </div>
            <Form onSubmit={(e)=>{handleLogin(e)}} role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                   <Input {...bindLogin} placeholder={L({children:"E-mail"})} type="text" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    {...bindPassword}
                    placeholder={L({children:"Mot de pass"})}
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                 <L>Se connecté</L>
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                getToRegistration();
              }}
            >
              <small><L>Créer un compte</L></small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
