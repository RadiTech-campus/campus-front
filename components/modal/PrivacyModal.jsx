import styled from "@emotion/styled";
import React from "react";
import Modal from "./Modal";
import Image from "next/image";

const SignUpModalTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin: 0px 0px;
`;
const SignUpModalContent = styled.div`
  font-size: 14px;
  width: 100%;
  text-align: center;
  margin: 5px 0px;
`;

const ClassImage = styled.div`
  /* height: 250px; */
  width: 100%;
  height: 180px;
  position: relative;
  > img {
    /* border-radius: 10px; */
    margin: 0px 0px 0px;
  }
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
      <SignUpModalContent>
        <ClassImage>
          <Image
            //   src={`/${lid}.jpeg`}
            src={`/privacy.png`}
            alt="메인 배경 이미지"
            style={{ objectFit: "cover" }}
            fill
          />
        </ClassImage>
      </SignUpModalContent>
    </Modal>
  );
}

export default PrivacyModal;
