import React from "react";
import { Paper } from "@mui/material"; 
import { Stepper, Step }  from "@mui/material"; 
import UserService from "services/user.service";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";  
import authService from "services/auth.service";
 

const ProfilingQuestion = (props) => {

  const [questionClass, setQuestionClass] = React.useState("dnone");
  const [activeSteps, setActiveSteps] = React.useState(0);
  const [finalisedSteps, setfinalisedSteps] = React.useState(['0']);
  const [currentQuestion, setcurrentQuestion] = React.useState(false);
  const [allQuestions, setallQuestions] = React.useState([]);
  const [userResponses, setUserResponses] = React.useState([]);

  const dispatch = useDispatch();

  const setResponse = (question, response) => {
  

    const  UserResponse ={ 
      question: question,
      response: response
    }

    userResponses.push(UserResponse);

    setUserResponses(userResponses);

    if (allQuestions.length > activeSteps + 1) {
      setcurrentQuestion(allQuestions[activeSteps + 1])
      setActiveSteps(activeSteps + 1);
      let finalcount = finalisedSteps
      finalcount.push(activeSteps + 1)
      setfinalisedSteps(finalcount)
    }

    if (allQuestions.length == activeSteps+1) {
      saveUserProfile()
    }
 
  };

  const saveUserProfile = () => {
      UserService.saveUserProfiling(userResponses).then(function(r){
        props.closeQuestion()
      })
  }

  const handleStepClick = (e) => {
    if (finalisedSteps.includes(e)) {
      setActiveSteps(e);
      setcurrentQuestion(allQuestions[e]);
    }
  };

  const getQuestions = () => {
    dispatch({ type: "LOADING" });
    UserService.getProfillingQuestions().then((response) => {
      dispatch({ type: "DONE_LOADING" });
      if (response.data.questions.length > 0) {
        setallQuestions(response.data.questions);
        setcurrentQuestion(response.data.questions[0]);
        setActiveSteps(0);
      }
    });
  };

  React.useEffect(() => {
    getQuestions();
    if (props.display) {
      setQuestionClass("QuestionOverlay");
    } else {
      setQuestionClass("QuestionDnone");
    }
  }, [props]);

  return (
    <div className={questionClass}>
      <Paper className="questionPaper">
        <div className="mt-2">
          <Stepper
            activeStep={activeSteps}
            as="button"
            onClick={handleStepClick}
          >
            {allQuestions.map((question, index) => {
              return <Step key={index} />;
            })}
          </Stepper>
        </div>

        <div
          className="questionContainer mt-5"
          style={{ fontFamily: "Staatliches", fontSize: "22px" }}
        >
          {currentQuestion ? currentQuestion.question : ""}

          <div className="AnswerCntainer">
            {currentQuestion
              ? currentQuestion.responses.map((response,ind) => {
                  return (
                    <Button
                        key={ind}
                      style={{
                        fontFamily: "Saira Condensed",
                        fontSize: "18px",
                      }}
                      variant="text"
                      className="m-3"
                      onClick={() => setResponse(currentQuestion, response)}
                    >
                      {response.reponce}
                    </Button>
                  );
                })
              : ""}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ProfilingQuestion;
