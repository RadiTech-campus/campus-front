import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import useOutSideClick from "../../hooks/useOutSideClick";
import ModalContainer from "./ModalContainer";

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 340px;
  height: fit-content;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.div`
  float: right;
  width: 40px;
  height: 40px;
  margin: 20px;
  cursor: pointer;
  i {
    color: #5d5d5d;
    font-size: 30px;
  }
`;

const Contents = styled.div`
  margin: 30px 30px;
  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 60px;
  }
  img {
    margin-top: 60px;
    width: 300px;
  }
`;

const Button = styled.button`
  width: 100%;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  background-color: #c100d7;
  /* border-radius: 10px; */
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #c100d7;
  }
  margin-top: 30px;
`;

function Modal({ onClose, children }) {
  // const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };

  // useOutSideClick(modalRef, handleClose);
  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);
  return (
    <ModalContainer>
      <Overlay>
        <ModalWrap>
          {/* <ModalWrap ref={modalRef}> */}
          {/* <CloseButton onClick={handleClose}>
            <i className="fa-solid fa-xmark">x</i>
          </CloseButton> */}
          <Contents>
            {children}
            <Button onClick={handleClose}>확인</Button>
          </Contents>
        </ModalWrap>
      </Overlay>
    </ModalContainer>
  );
}

export default Modal;
