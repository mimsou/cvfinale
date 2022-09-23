import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect ,useHistory } from "react-router-dom";
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
import {Helmet} from "react-helmet";


const Main = (props) => {

  const [lang, setLang] = useState("fr");

  useEffect(() => {


    /*  fetchJsFromCDN('https://www.ezojs.com/ezoic/sa.min.js', ['ezstandalone']).then(([ezstandalone]) => {
     ezstandalone.define(131);
      if (!ezstandalone.enabled) {
        ezstandalone.enable();
        ezstandalone.display();
      }
      else {
        ezstandalone.refresh();
      }
    }) 
 */
  }, []);



  const fetchJsFromCDN = (src, externals = []) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.setAttribute('src', src)
      script.addEventListener('load', () => {
        resolve(externals.map(key => {
          const ext = window[key]
          typeof ext === 'undefined' && console.warn(`No external named '${key}' in window`)
          return ext
        }))
      })
      script.addEventListener('error', reject)
      document.body.appendChild(script)
    })
  }

  return (
    <>
      {/* <Helmet>
       <script src="http://www.ezojs.com/ezoic/sa.min.js" type="text/javascript" />
     </Helmet> */}
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
