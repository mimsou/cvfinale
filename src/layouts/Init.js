import React, { useEffect } from "react";
import {  Route, Switch, Redirect  } from "react-router-dom";
import AuthFooter from "components/Footers/AuthFooter.js";
import AuthService from "../services/auth.service"
import routes from "routes.js";



const Init = (props) => {

  

  const mainContent = React.useRef(null);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/cv") {
        return (
            <Route
                path={prop.layout + prop.path}
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
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/cv/landing" />
              </Switch>
        </div>

      </>
  );
};

export default Init;
