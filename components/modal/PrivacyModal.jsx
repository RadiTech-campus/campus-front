import styled from "@emotion/styled";
import React from "react";
import Modal from "./Modal";

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

const SignUpModalTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0px;
`;
const SignUpModalContent = styled.div`
  font-size: 14px;
  width: 100%;
  text-align: center;
  margin: 5px 0px;
`;
function PrivacyModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <SignUpModalTitle>개인정보 이용약관</SignUpModalTitle>
      {/* <SignUpModalContent>
        아이디 {userId} 로 신규가입 처리가 되었습니다
      </SignUpModalContent>
      <SignUpModalContent>국시 합격까지 RadiTech-Campus가</SignUpModalContent>
      <SignUpModalContent>함께하겠습니다.</SignUpModalContent> */}
    </Modal>
  );
}

export default PrivacyModal;
