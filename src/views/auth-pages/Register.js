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

const Register = () => {

  let Tracker = usePageTracking();


  const [Error, setError] = useState(false);

  let history = useHistory();

  const getToLogin = () => {
    history.push("/auth/login");
  };

  let err = "";
  const { value: login, bind: bindLogin, reset: resetLogin } = useInput("");
  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");
  const {
    value: repassword,
    bind: bindRepassword,
    reset: resetRepassword,
  } = useInput("");

  const handleRegistration = (e) => {

    e.preventDefault();

    if (password !== repassword) {
      setError(2)
    } else {
      AuthService.registration(name, login, email, password).then(
        () => {
          setError(false)
          history.push("/auth/login");
          window.gtag("event", "Enregistrement classic"); 
        },
        (error) => {
          setError(1)
          window.gtag("event", "Erreur enregistrement classic"); 
        }
      );
    }
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
              <small><L>Inscription</L></small>
            </div>
            { Error && <div className="error_container">
              { Error && Error == 1 &&
                     <L>Email que vous avez introduit existe déja</L>
              }

              { Error && Error == 2 &&
                     <L>Les mots de passes introduits ne sont pas identique</L>
              }
            </div>}
            <Form onSubmit={(e)=>handleRegistration(e)} role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input required {...bindName} placeholder={L({children:"Nom prénom"})} type="text" />
                </InputGroup>
              </FormGroup>
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
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                     required
                    {...bindPassword}
                     placeholder={L({children:"mot de pass"})}
                    type="password"
                    autoComplete="new-password"
                  />
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
                     required
                    {...bindRepassword}
                    placeholder=  {L({children:"Verification mot-de-pass"})}
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  <span className="text-danger font-weight-700">{err}</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        <L>j'accepte la politique de securité</L>{" "}
                        <a href="https://cviotek.com/politique-de-confidentialite/" onClick={(e) => e.preventDefault()}>
                          <L>Politique</L>
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  <L>Crée un compte</L>
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

export default Register;
