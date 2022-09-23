import React, { useContext, useState, useEffect } from "react";

import { useInput } from "../../hooks/inputHook";

import AuthService from "../../services/auth.service";

import { useHistory, useParams } from "react-router-dom";

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

const PasswordReset = () => {
  const [Error, setError] = useState(false);
  const [TokenOK, setTokenOK] = useState(false);
  const [result, setResult] = useState(false);
  const [sendOk, setSendOk] = useState(false);
  let Tracker = usePageTracking();

  let { token } = useParams();

  let history = useHistory();

  const getToLogin = () => {
    history.push("/auth/login");
  };

  let err = "";
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");
  const {
    value: passwordconfirm,
    bind: bindConfirm,
    reset: resetConfirm,
  } = useInput("");

  useEffect(() => {
    AuthService.verifyToken(token).then(
      (result) => {
        setTokenOK(true);
        setResult(result);
      },
      (error) => {
        setError(1);
      }
    );
  }, []);

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (password == passwordconfirm) {
      AuthService.setPassword(password, result).then(
        () => {
          setError(false);
          setSendOk(true)
          window.gtag("event", "Reset password"); 
        },
        (error) => {
          setError(1);
          window.gtag("event", "Erreur reset password"); 
        }
      );
    } else {
      setError(2);
    }
  };

  const [lang, setLang] = useContext(LanguageContext);

  return (
    <>
      <Col md="12">
        <LangPicker
          className="lang-selection-auth"
          setLanguage={(lang) => setLang(lang)}
        />
      </Col>
      <Col lg="6" md="8">
        <Card className="shadow border-0">
          {TokenOK  && !sendOk ?  (
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small> <L>Recupération du compte</L> </small> 
              </div>
            
              {Error && (
                <div className="error_container">
                  {Error && Error == 1 && (
                    <L>
                      Votre token a expiré , merci de réessayer depuis le debut.
                    </L>
                  )}

                  {Error && Error == 2 && (
                    <L>Les mots de passes introduits ne sont pas identique</L>
                  )}
                </div>
              )}
              <Form onSubmit={(e) => handleResetPassword(e)} role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      required
                      {...bindPassword}
                      placeholder={L({ children: "Mot de passe" })}
                      type="password"
                      autoComplete="password"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      required
                      {...bindConfirm}
                      placeholder={L({ children: "Confirmer mot de passe" })}
                      type="password"
                      autoComplete="password"
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
          ) : (
            <CardBody className="px-lg-5 py-lg-5">
              {Error ? (
                <div className="error_container">
                  {Error && Error == 1 && (
                    <L>
                      Votre token a expiré , merci de réessayer depuis le debut.
                    </L>
                  )}

                  {Error && Error == 2 && (
                    <L>Les mots de passes introduits ne sont pas identique</L>
                  )}
                </div>
              ) : (
                <L>Chargement</L>
              )}
                {sendOk && (
                <div className="ok_container">
                  <L>
                    {" "}
                    Votre mot de passe a été réinitialisée , Clickez <a className="text-light" href="" onClick={(e) =>{  e.preventDefault(); getToLogin(); }} > <L>ici</L> </a> pour vous connecter{" "}
                  </L>
                </div>
              )}
            </CardBody>
          )}
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
              <small>
                <L>Se connecter</L>
              </small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default PasswordReset;
