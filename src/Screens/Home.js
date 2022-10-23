import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import WarningPopup from "../Components/WarningPopup";
import { TextareaAutosize } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import * as data from "../datas";
import { testSuccess, testExit } from "../Slices/testSlice";
import { logOutSuccess } from "../Slices/authSlice";

function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isSubmit = useSelector((state) => state.test.isSubmit);
  const category = useSelector((state) => state.auth.category);
  const [open, setOpen] = useState(false);
  const [currentQstnNo, setCurrentQstnNo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [notes, setNotes] = useState("");
  let totalTime = 300;
  const [time, setTime] = useState(totalTime);
  useEffect(() => {
    if (isAuth === false) {
      navigate(`/signin`);
    } else if (isSubmit === true) {
      navigate(`/score`);
    } else {
      let qstns = data.questions.filter((i) => i.category === category);
      setQuestions(qstns);
      setCurrentQstnNo(0);
      setLoading(false);
    }
  }, []);

  const [state, setState] = useState({
    currentQstn: [],
    data: [],
    popUpMsg: "",
  });

  const PassResult = (time) => {
    let data = {
      data: state.data,
      time: time,
      totalTime: totalTime,
      questions: questions,
    };
    dispatch(testSuccess(data));
    navigate("/score");
  };

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          PassResult(time);
          return 0;
        } else return time - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  useEffect(() => {
    console.log(currentQstnNo);
    let currentQstn = questions[currentQstnNo];
    setState((prevState) => {
      return {
        ...prevState,
        currentQstn,
      };
    });
  }, [currentQstnNo]);

  const handleSubmit = () => {
    if (currentQstnNo === 0) {
      dispatch(testExit());
      dispatch(logOutSuccess());
      navigate("/signin");
    } else {
      let data = {
        data: state.data,
        time: time,
        totalTime: totalTime,
        questions: questions,
      };
      dispatch(testSuccess(data));
      navigate("/score");
    }
  };

  const handleButton = (type) => {
    let data = [...state.data];
    if (type === "next") {
      if (data.filter((i) => i.quesionIndx === currentQstnNo).length === 0) {
        let newData = {
          quesionIndx: currentQstnNo,
          answer: "",
          note: notes,
        };
        data.push(newData);
        setState((prevState) => {
          return {
            ...prevState,
            data,
          };
        });
      }
      setNotes("");
      if (questions.length === currentQstnNo + 1) {
        setOpen(true);
        setState((prevState) => {
          return {
            ...prevState,
            popUpMsg: "submit",
          };
        });
      } else {
        setCurrentQstnNo(currentQstnNo + 1);
      }
    } else {
      if (currentQstnNo === 0) {
        setOpen(true);
        setState((prevState) => {
          return {
            ...prevState,
            popUpMsg: "exit",
          };
        });
      } else {
        let note = data.filter((i) => i.quesionIndx === currentQstnNo - 1)[0]
          .note;
        setNotes(note);
        setCurrentQstnNo(currentQstnNo - 1);
      }
    }
  };

  const handleCheckBox = (e, val) => {
    const { checked } = e.target;
    console.log(checked);
    console.log(val);
    let data = [...state.data];
    if (data.filter((i) => i.quesionIndx === currentQstnNo).length) {
      let current = data.filter((i) => i.quesionIndx === currentQstnNo)[0];
      if (checked) {
        current.answer = val;
        current.note = notes;
      } else {
        current.answer = "";
        current.note = "";
      }
    } else if (checked) {
      let newData = {
        quesionIndx: currentQstnNo,
        answer: val,
        note: notes,
      };
      data.push(newData);
    }
    setState((prevState) => {
      return {
        ...prevState,
        data,
      };
    });
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Container>
        <TimeTxt>
          {`${Math.floor(time / 60)}`.padStart(2, 0)}:
          {`${time % 60}`.padStart(2, 0)}
        </TimeTxt>
        <Container2>
          <Left>
            <QuestionNum>
              Question {currentQstnNo + 1} of {questions.length}
            </QuestionNum>
            <Question>
              {state.currentQstn ? state.currentQstn.question : ""}
            </Question>
            <div>
              {state.currentQstn
                ? state.currentQstn.options.map((i, index) => (
                    <div>
                      <Checkbox
                        id={index}
                        onChange={(e) => handleCheckBox(e, i)}
                        checked={
                          state.data[currentQstnNo]
                            ? state.data[currentQstnNo].answer === i
                            : false
                        }
                      />
                      <Label for={index}>{i}</Label>
                    </div>
                  ))
                : null}
            </div>

            <ButtonContainer>
              <StyledButon
                variant="outlined"
                onClick={() => handleButton("previous")}
              >
                {currentQstnNo > 0 ? "Back" : "Exit"}
              </StyledButon>
              <StyledButon
                variant="contained"
                onClick={() => handleButton("next")}
              >
                {currentQstnNo + 1 === questions.length ? "Submit" : "Next"}
              </StyledButon>
            </ButtonContainer>
          </Left>
          <Right>
            <RightHeader>Notepad</RightHeader>
            <Textarea
              aria-label="minimum height"
              placeholder="Scribble your not here..."
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </Right>
        </Container2>

        <WarningPopup
          open={open}
          setOpen={setOpen}
          handleSubmit={handleSubmit}
          popUpMsg={state.popUpMsg}
        />
      </Container>
    );
  }
}

export default Home;

const Textarea = styled(TextareaAutosize)`
  && {
    height: 100% !important;
    border: unset;
    outline: unset;
    padding: 10px;
  }
`;
const RightHeader = styled.span`
  border-bottom: 1px solid grey;
  width: 100%;
  font-size: 16px;
  color: #555555;
  padding: 15px;
`;

const Label = styled.label`
  cursor: pointer;
  user-select: none;
`;

const Right = styled.div`
  background-color: white;
  height: 430px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 50%;
  display: flex;
  gap: 10px;
`;
const StyledButon = styled(Button)`
  && {
    width: 50%;
  }
`;
const Question = styled.span`
  color: #333333;
  min-width: 29em;
  word-break: break-all;
  font-size: 20px; ;
`;

const QuestionNum = styled.span`
  color: #555555;
  font-weight: 400;
  font-size: 18px;
`;

const Left = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 30px;
  flex-direction: column;
`;
const Container2 = styled.div`
  display: grid;
  width: 100%;
  padding: 16px 50px 0px 50px;
  height: 100%;
  column-gap: 100px;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 864px) {
    grid-template-columns: 1fr;
  }
`;
const Container = styled.div`
  height: 100%;
  width: 100%; ;
`;

const TimeTxt = styled.span`
  font-size: 24px;

  display: flex;
  justify-content: center;

  margin-top: 15px;
`;
