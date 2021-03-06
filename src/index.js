import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./configureStore.js";
import "assets/plugins/nucleo/css/nucleo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "layouts/App.js";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import InitLayout from "layouts/Init.js";
import Loader from "./Loader";
import GoogleFontLoader from "react-google-font-loader";
import { LanguageContext } from "./localeContext";
import Landing from "./views/public-pages/Landing";
import ReactGA from 'react-ga';
const TRACKING_ID = "323256753";
ReactGA.initialize(TRACKING_ID);

const Main = (props) => {

  const [lang, setLang] = useState("fr");

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  
  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: "Roboto",
            weights: [400, "400i"],
          },
          {
            font: "Roboto Condensed",
            weights: [400, 700],
          },
          {
            font: "Staatliches",
            weights: [400, 700],
          },
          {
            font: "Saira Condensed",
            weights: [400, 700],
          },
        ]}
        subsets={["cyrillic-ext", "greek"]}
      />
      <LanguageContext.Provider value={[lang, setLang]}>
        <Provider store={Store}>
          <Loader />
          <BrowserRouter>
            <Switch>
              <Route path="/app" render={(props) => <App {...props} />} />
              <Route
                path="/admin"
                render={(props) => <AdminLayout {...props} />}
              />
              <Route
                path="/auth"
                render={(props) => <AuthLayout {...props} />}
              />
              <Route path="/cv" render={(props) => <InitLayout {...props} />} />
              <Route path="/:lang?" render={(props) => <Landing {...props} />} />
              <Redirect from="/" to="/:lang?" />
            </Switch>
          </BrowserRouter>
        </Provider>
      </LanguageContext.Provider>
    </>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
