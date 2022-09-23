import React, { useContext, useState , useEffect } from "react";

import { useInput } from "../../hooks/inputHook";

import AuthService from "../../services/auth.service";

import { useHistory } from "react-router-dom";

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
import LangPicker from "components/special/Helper-component/LangPicker";
import { usePageTracking } from "hooks/usePageTracking";

const PasswordRecovery = () => {


  const [Error, setError] = useState(false);
  const [sendOk, setSendOk] = useState(false);

  let history = useHistory();
  let Tracker = usePageTracking();

  const getToLogin = () => {
    history.push("/auth/login");
  };

  let err = "";
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");

  const handleSendMail = (e) => {

    e.preventDefault();
      AuthService.resetMail(email).then(
        () => {
          setError(false)
          setSendOk(true)
          window.gtag("event", "Envoie mail de reset password"); 
        },
        (error) => {
          setError(1)
          window.gtag("event", "Erreur envoie mail de reset password"); 
        }
      );

  };

  const [lang, setLang] = useContext(LanguageContext);

  return (
    <>
     <Col md="12">
    <LangPicker className="lang-selection-auth"  setLanguage={(lang)=>setLang(lang)}  />
    </Col>
      <Col lg="6" md="8">
         <Card className="shadow border-0">
          
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small> <L>Recupération du compte</L> </small>
            </div>
            { sendOk && <div className="ok_container">

                     <L> Nous avons envoyé un lien de recupération sur votre adresse </L>
            
            </div>}
            { Error && <div className="error_container">
              { Error && Error == 1 &&
                     <L>Email que vous avez introduit ,n'existe pas dans notre base de donné</L>
              }
            </div>}
            <Form onSubmit={(e)=>handleSendMail(e)} role="form">


              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                     required
                    {...bindEmail}
                     placeholder={L({children:"E-mail"})}
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>



              <div className="text-muted font-italic">
                <small>
                  <span className="text-danger font-weight-700">{err}</span>
                </small>
              </div>
           
              
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  <L>Envoyer</L>
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>

        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href=""
              onClick={(e) => {
                e.preventDefault();
                getToLogin();
              }}
            >
              <small><L>Se connecter</L></small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default PasswordRecovery;
