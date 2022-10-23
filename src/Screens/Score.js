import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import ProgressCircle from "../Components/ProgressCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import WarningPopup from "../Components/WarningPopup";
import { testExit } from "../Slices/testSlice";
import { logOutSuccess } from "../Slices/authSlice";
import Loader from "../Components/Loader";

function Score() {
  const navigate = useNavigate();
  const { isSubmit, data } = useSelector((state) => state.test);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    score: 0,
    total: 0,
    percent: 0,
    wrongInperce: 0,
    wrong: 0,
    skippedInperce: 0,
    skipped: 0,
    time: "",
    totalTime: "",
    correctMarkInPerce: 0,
    userAnswers: [],
    questions: [],
    TimeTaken: "",
  });

  useEffect(() => {
    console.log(data);
    if (isSubmit === false) {
      navigate(`/signin`);
    } else if (data.data.length) {
      let userAnswers = data.data;
      let questions = data.questions;
      let time = data.time;
      let totalTime = data.totalTime;
      let TimeTaken = totalTime - time;
      let total = questions.length;
      let score = 0;
      let skipped = 0;
      let wrong = 0;
      userAnswers.map((i, index) =>
        questions[i.quesionIndx].answer === i.answer
          ? (score = score + 1)
          : i.answer === ""
          ? (skipped = skipped + 1)
          : (wrong = wrong + 1)
      );
      let percent = (score / total) * 100;
      let correctMarkInPerce = (score / total) * 100;
      let wrongInperce = (wrong / total) * 100;
      let skippedInperce = (skipped / total) * 100;
      setState((prevState) => {
        return {
          ...prevState,
          score,
          total,
          percent,
          wrongInperce,
          wrong,
          skippedInperce,
          skipped,
          time,
          totalTime,
          correctMarkInPerce,
          userAnswers,
          questions,
          TimeTaken,
        };
      });
      setLoading(false);
    }
  }, []);

  const handleSubmit = () => {
    dispatch(testExit());
    dispatch(logOutSuccess());
    navigate("/signin");
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Container>
        <Container2>
          <Score1>
            <Left>
              <div>
                <span>Score :</span>
                <span style={{ fontWeight: "bold" }}> {state.score}</span>
                <span>/{state.total} </span>
              </div>
              <div>
                <span>Time Taken :</span>
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  {`${Math.floor(state.TimeTaken / 60)}`.padStart(2, 0)}:
                  {`${state.TimeTaken % 60}`.padStart(2, 0)}
                </span>
              </div>
              <div>
                <Percentage>{Math.round(state.percent)}%</Percentage>
                <Total>Total Score</Total>
              </div>
            </Left>
            <Right>
              <ProgressContainer>
                <div>
                  <ProgressCircle
                    percent={state.percent}
                    isVal={true}
                    total={state.total}
                  />
                </div>
                <ProTXt>Final Score</ProTXt>
              </ProgressContainer>
              <ProgressContainer>
                <div>
                  <ProgressCircle
                    percent={state.correctMarkInPerce}
                    total={state.total}
                    score={state.score}
                  />
                </div>
                <ProTXt>Correct</ProTXt>
              </ProgressContainer>
              <ProgressContainer>
                <div>
                  <ProgressCircle
                    percent={state.wrongInperce}
                    total={state.total}
                    score={state.wrong}
                  />
                </div>
                <ProTXt>Wrong</ProTXt>
              </ProgressContainer>
              <ProgressContainer>
                <div>
                  <ProgressCircle
                    percent={state.skippedInperce}
                    total={state.total}
                    score={state.skipped}
                  />
                </div>
                <ProTXt>Skipped</ProTXt>
              </ProgressContainer>
            </Right>
          </Score1>

          <Footer1>
            <Note>Your scribble notes:</Note>
            {state.userAnswers.map((i) =>
              i.note !== "" ? (
                <NoteDiv>
                  <p>Question{i.quesionIndx + 1}:</p>
                  <p style={{ wordBreak: "break-all", marginTop: "10px" }}>
                    {i.note}
                  </p>
                </NoteDiv>
              ) : null
            )}
          </Footer1>
          <StyledButon variant="outlined" onClick={() => setOpen(true)}>
            Exit
          </StyledButon>
        </Container2>
        <WarningPopup
          open={open}
          setOpen={setOpen}
          handleSubmit={handleSubmit}
          popUpMsg="exit"
        />
      </Container>
    );
  }
}

export default Score;
const NoteDiv = styled.div`
  margin-bottom: 10px;
`;

const StyledButon = styled(Button)`
  && {
    margin: 30px auto;
    padding-right: 50px;
    display: flex;

    padding-left: 50px;
  }
`;
const Note = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
`;

const Footer1 = styled.div`
  border: 1px solid #cac8c8;
  padding: 20px 20px 10px 20px;
  margin-top: 30px;
`;

const ProTXt = styled.span`
  color: #555555;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

const ProgressContainer = styled.div`
  display: flex;

  flex-direction: column;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%; ;
`;
const Total = styled.h5`
  font-weight: 700;
  font-size: 16px;
  color: #2b7df7;
`;
const Percentage = styled.h3`
  font-weight: 700;
  font-size: 34px;
  color: #2b7df7;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Score1 = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e5e5;
  width: 100%;
`;
const Container2 = styled.div`
  width: 910px;
  padding: 20px;
  background-color: white;
`;
