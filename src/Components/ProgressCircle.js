import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import styled from "styled-components";
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress1 variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography1
          styled={{ fontSize: "14px !important" }}
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {props.isVal ? Math.round(props.value) : props.score}

          {props.isVal ? "%" : ""}
        </Typography1>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularStatic(props) {
  const { percent, isVal, score } = props;

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 0 : prevProgress + 10
  //     );
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <CircularProgressWithLabel value={percent} isVal={isVal} score={score} />
  );
}

const CircularProgress1 = styled(CircularProgress)`
  && {
    height: 90px !important;
    width: 90px !important;
  }
`;

const Typography1 = styled(Typography)`
  && {
    font-size: 19px;
    font-weight: 600;
  }
`;
