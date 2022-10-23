import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import styled from "styled-components/macro";
import { CheckAuthentication } from "../Functions/utils";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../Slices/authSlice";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    category: "",
    validation_err: {
      email_err: "",
      password_err: "",
      category_err: "",
    },
  });

  const isAuth = useSelector((state) => state.auth.isAuth);
  useEffect(() => {
    if (isAuth === true) {
      navigate(`/`);
    }
  }, []);

  const userList = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, category } = state;
    let validation_err = state.validation_err;
    if (category != "") {
      let authenticate = CheckAuthentication(userList, email, password);
      if (authenticate.StatusCode === 6001) {
        validation_err.email_err = authenticate.message;
      } else if (authenticate.StatusCode === 6002) {
        validation_err.password_err = authenticate.message;
      } else {
        dispatch(loginSuccess(state));
        navigate(`/`);
      }
    } else {
      validation_err.category_err = "please select category to sign in";
    }
    setState((prevState) => {
      return {
        ...prevState,
        validation_err,
      };
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return (
    <Container>
      <Container2>
        <Left>
          <Img src={require("../Components/images/sofa.png")} />
        </Left>
        <Right>
          <SignupContainer
            onSubmit={(e) => handleSubmit(e)}
            onChange={(e) => handleChange(e)}
          >
            <SignUpTxt>User Sign in</SignUpTxt>
            <InputContainer>
              <Label for="email">Your Email</Label>
              <Input
                type="text"
                id="email "
                name="email"
                placeholder="Enter your email"
                required
              />
              {state.validation_err.email_err ? (
                <ErrorMsg>{state.validation_err.email_err}</ErrorMsg>
              ) : null}
            </InputContainer>
            <InputContainer>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
              {state.validation_err.password_err ? (
                <ErrorMsg>{state.validation_err.password_err}</ErrorMsg>
              ) : null}
            </InputContainer>
            <InputContainer>
              <Label for="Cpassword">Exam Category</Label>
              <Select name="category" required>
                <option value="">--Select your exam category--</option>
                <option value="sports">Sports</option>
                <option value="arts">Arts</option>
                <option value="history">History</option>
                <option value="physics">Physics</option>
              </Select>
              {state.validation_err.category_err ? (
                <ErrorMsg>{state.validation_err.category_err}</ErrorMsg>
              ) : null}
            </InputContainer>

            <StyledButton variant="contained" type="submit">
              SIGN In
            </StyledButton>

            <BottomText1>
              Dont't have an Account? <LinkTo to="/signup">SignUp</LinkTo>
            </BottomText1>
          </SignupContainer>
        </Right>
      </Container2>
    </Container>
  );
}

export default SignIn;

const Select = styled.select`
  width: 100%;

  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid grey;
  padding: 10px; ;;
`;

const LinkTo = styled(Link)`
  text-decoration: none;
  font-weight: bold;
`;
const BottomText1 = styled.span`
  font-weight: 400;
  font-size: 12.25px;
  width: 100%;
  text-align: center;

  color: rgba(130, 134, 154, 0.85);
`;
const StyledButton = styled(Button)`
  && {
    width: 100%;
    height: 48.12px;

    background: #2b7df7;
    border-radius: 8.75px;
  }
`;
const Input = styled.input`
  margin-top: 10px;

  border-top: none;
  border-right: none;
  width: 100%;
  border-left: none;
  border-bottom: 1px solid grey;
  outline: none;
  ::placeholder {
    font-weight: 500;
    font-size: 12.25px;
    color: rgba(130, 134, 154, 0.5);
  }
`;

const Label = styled.label`
  width: 51.21px;
  height: 11.38px;
  left: 0px;
  top: -0.38px;

  font-weight: 500;
  font-size: 10.5px;

  color: #82869a;
`;
const SignUpTxt = styled.h4`
  color: #282c40;
  width: 249px;
  height: 35px;

  font-weight: 700;
  font-size: 31.5px;
  line-height: 110%;
`;
const InputContainer = styled.div``;

const SignupContainer = styled.form`
  width: 432px;
  padding: 40px 40px 0px 40px;
  height: 416px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  box-shadow: 0px 6px 60px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
`;
const Right = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Left = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Container2 = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 864px) {
    grid-template-columns: 1fr;
  }
`;

const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
`;

const ErrorMsg = styled.span`
  font-size: 11px;
  color: red;
`;
