import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "styled-components/macro";

export default function Loader() {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
}

const Container = styled(Box)`
  width: 100vw;
  height: 100vh;
  background: #fff;
  overflow: hidden;
  display: grid;
  place-items: center;
`;
