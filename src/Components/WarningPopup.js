import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const { open, setOpen } = props;
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Boxx sx={style}>
          <Close onClick={() => setOpen(false)} />

          <TopContainer>
            <Img src={require("../Components/images/warn.png")} />
            <WarnTXt>Warning</WarnTXt>
          </TopContainer>
          <p style={{ textAlign: "center" }}>
            Are you sure, you want to {props.popUpMsg} the exam?{" "}
          </p>
          <StyledButon variant="contained" onClick={() => props.handleSubmit()}>
            Continue
          </StyledButon>
        </Boxx>
      </Modal>
    </div>
  );
}
const StyledButon = styled(Button)`
  && {
    margin-top: 20px;
    width: 100%;
  }
`;
const WarnTXt = styled.span`
  font-weight: 700;
  margin-top: 15px;
  font-size: 18px;
`;

const Img = styled.img`
  width: 100%;
  object-fit: contain;
  height: 100%;
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 15px;
`;
const Close = styled(CloseIcon)`
  position: absolute;
  right: 15px;
  cursor: pointer;
  top: 10px;
`;
const Boxx = styled(Box)`
  && {
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;
