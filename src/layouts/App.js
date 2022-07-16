import React, { useEffect, useState, useRef } from "react";

import {
  useLocation,
  useHistory,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Container } from "reactstrap";
import FrontNavBar from "components/Navbars/FrontNavBar";
import ProfilingQuestion from "../components/special/ProfilingQuestion";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import routes from "routes.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { useDispatch } from "react-redux";

const App = (props) => {

  const [FrontClass, setFrontClass] = useState("");
  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [CurrentCvs, setCurrentCvs] = useState({});
  const [CvMode, setCvMode] = useState("");
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "LOADING" });
    setFrontClass("blur");
    initUser();

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  useEffect(() => {
  
    if(Object.entries(CurrentCvs)!=0) history.push("/app/template");
  }, [CurrentCvs]);
  
  const initUser = () => {


    const userFetch = localStorage.getItem("userInfoFetchs");

    if (userFetch!=true) {
      UserService.getUserByloginName()
        .then((response) => {
          let id = response.data.id;
          let profiling = response.data.profiling;
          dispatch({ type: "DONE_LOADING" });
          //localStorage.setItem("userInfoFetchs", true);
         // if (!profiling) {
           // setFrontClass("blur");
            //setDisplayQuestion(true);
          //} else {
            setFrontClass("");
            setDisplayQuestion(false);
          //}
        })
        .catch((response) => {});
    } else {
      dispatch({ type: "DONE_LOADING" });
      setFrontClass("");
    }
  };


  
  const editCurrentCv = (cv) => {
    setCurrentCvs(cv)
  };

  const updateCurrentCv = (cv) => {
    setCurrentCvs(cv)
  };


  const closeQuestion = () => {
    setDisplayQuestion(false);
    setFrontClass("");
  }

  const getRoutes = (routes) => {
    return routes.map((prop, keys) => {
      if (prop.layout === "/app" && AuthService.isLoggedIn()) {
        return (
          <Route
            editCv={(cv) => setCurrentCvs(cv)}
            currentCv={CurrentCvs}
            mode={CvMode}
            setModes={(mode)=>setCvMode(mode)}
            path={prop.layout + prop.path}
            component={() => (
              <prop.component

                editCv={(cv) => {
                  editCurrentCv(cv);
                }}
                setModes={(mode)=>setCvMode(mode)}
                currentCv={CurrentCvs}
                mode={CvMode}
                updateCurrentCv={(cv)=>updateCurrentCv(cv)}

              />
            )}
            key={keys}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      {displayQuestion == true && (
        <ProfilingQuestion closeQuestion={()=>closeQuestion()} display={displayQuestion} />
      )}
      <div className={FrontClass}>
        <FrontNavBar />
        {!displayQuestion && (
          <Container fluid className="mt-1">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Container>
        )}
         <AuthFooter />
      </div>
    </>
  );
};

export default App;
