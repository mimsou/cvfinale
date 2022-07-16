import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer >
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
               
                  KyWeb
                
              </div>
            </Col>
            <Col xl="6">
              
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
               
                <NavItem>
                  <NavLink
                    href=""
                    target="_blank"
                  >
                  A props
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    href="https://cviotek.com/contact/"
                    target="_blank"
                  >
                    Contact
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    href="https://cviotek.com/politique-de-confidentialite/"
                    target="_blank"
                  >
                   Politique de confidentialité
                  </NavLink>

                  
                </NavItem>

    
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
