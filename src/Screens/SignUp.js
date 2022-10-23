import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import { CheckEmail, containsWhitespace, Encrypt } from "../Functions/utils";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { signUpSuccess } from "../Slices/userSlice";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    Cpassword: "",
    is_error: false,
    email_error: "",
  });
  const userList = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    if (state.is_error === false && state.email_error === "") {
      console.log("successss");
      let new_user = {
        user_id: uuid(),
        email: state.email,
        password: Encrypt(state.password),
      };
      dispatch(signUpSuccess(new_user));
      navigate(`/signin`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    let is_error = state.is_error;
    let email_error = state.email_error;
    if (name === "Cpassword") {
      if (state.password !== value) {
        is_error = true;
      } else {
        is_error = false;
      }
    } else if (name === "email") {
      if (CheckEmail(userList, value)) {
        email_error = "email already exist";
      } else if (containsWhitespace(value)) {
        email_error = "can't give space in email";
      } else {
        email_error = "";
      }
    }
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        is_error,
        email_error,
      };
    });
  };
  return (
    <Container>
      <Container2>
        <Left>
          <Img src={require("../Components/images/lap.jpg")} />
        </Left>
        <Right>
          <SignupContainer
            onSubmit={(e) => handleSubmit(e)}
            onChange={(e) => handleChange(e)}
          >
            <SignUpTxt>User Sign up</SignUpTxt>
            <InputContainer>
              <Label for="email">Your Email</Label>
              <Input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
              />
              {state.email_error ? (
                <ErrorMsg>{state.email_error}</ErrorMsg>
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
            </InputContainer>
            <InputContainer>
              <Label for="Cpassword">Confirm Password</Label>
              <Input
                type="text"
                id="Cpassword"
                name="Cpassword"
                placeholder="Confirm Password"
                required
              />
              {state.is_error ? <ErrorMsg>password not match</ErrorMsg> : null}
            </InputContainer>

            <StyledButton variant="contained" type="submit">
              SIGN UP
            </StyledButton>

            <BottomText1>
              Already have an account? <LinkTo to="/signin">SignIn</LinkTo>
            </BottomText1>
          </SignupContainer>
        </Right>
      </Container2>
    </Container>
  );
}

export default SignUp;

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
