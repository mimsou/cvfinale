import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import AuthService from "../services/auth.service"

import routes from "routes.js";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
  
    document.body.classList.add("body-bg");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth" && !AuthService.isLoggedIn()) {
        return (
          <Route
            path={prop.layout + prop.path+"/:lang?"}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <AuthNavbar />
      
        {/* Page content */}
        <Container className="mt-4 pb-5">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/app/user-information" />
            </Switch>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
};

export default Auth;
