import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Container>
      <FirstContainer>
        <LogoContainer>
          <Logo src={require("../Components/images/Logo.jpg")} />
        </LogoContainer>
        <IconContainer>
          <LogoContainer>
            <Logo src={require("../Components/images/fb.png")} />
          </LogoContainer>
          <LogoContainer>
            <Logo src={require("../Components/images/twitter.png")} />
          </LogoContainer>
          <LogoContainer>
            <Logo src={require("../Components/images/utube.png")} />
          </LogoContainer>{" "}
          <LogoContainer>
            <Logo src={require("../Components/images/insta.png")} />
          </LogoContainer>
        </IconContainer>
      </FirstContainer>
      <Line>
        <Span></Span>
      </Line>
      <NoteContainer>
        <Note>
          © Copyright Clinical Scholar | Powered by Quinoid Bussiness solutions
        </Note>
      </NoteContainer>
    </Container>
  );
}

export default Footer;
const NoteContainer = styled.div`
  width: 100%;
  text-align: center;
`;
const Note = styled.span`
  margin: auto;
  padding-bottom: 20px; ;
`;
const SecondContainer = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  height: 50px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  align-self: center;
  padding: 20px 30px;
`;
const Span = styled.div`
  width: 100%;
  height: 1px;
  background-color: grey;
  align-self: center;
`;
const IconContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const LogoContainer = styled.div`
  cursor: pointer;
`;
const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
`;
const FirstContainer = styled.div`
  width: 100%;
  padding: 15px 30px 0px 30px;
  display: flex;
  justify-content: space-between;
  background-color: white;
`;
