import React, { lazy, Suspense } from "react";
import styled from "styled-components/macro";
import { Routes as Switch, Route } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { CircularProgress } from "@mui/material";
const Home = lazy(() => import("../Screens/Home"));
const Score = lazy(() => import("../Screens/Score"));
function Navigation() {
  return (
    <Container>
      <Header />

      <Suspense
        fallback={
          <Box>
            <CircularProgress />
          </Box>
        }
      >
        <Routes>
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/score" element={<Score />} />
          </Switch>
        </Routes>
        <Footer />
      </Suspense>
    </Container>
  );
}

export default Navigation;

const Container = styled.div`
  width: 100%;

  /* min-height: 100vh; */
`;

const Routes = styled.div`
  margin-top: 80px;

  display: flex;
  flex-direction: column;
  flex: 1;

  background-color: #e5e5e5;
  min-height: 100vh;
`;

const Box = styled.div`
  width: 100%;
  height: 80vh;

  /* width: 96%; */

  display: grid;
  place-items: center;
`;
