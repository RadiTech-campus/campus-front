import styled from "@emotion/styled";
import React, { useState } from "react";
import Phone from "../icons/Phone";
import MyHome from "../icons/MyHome";
import Gang from "../icons/Gang";
import Logo from "../icons/Logo";
import Kuk from "../icons/Kuk";
import Modal from "../modal/Modal";
import { useRouter } from "next/router";

const BottomNavContainer = styled.div`
  display: none;
  @media (max-width: 650px) {
    height: 55px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    background-color: white;
    z-index: 1000;
  }
`;

const NavButton = styled.div`
  width: 18%;
  color: #a2a2a2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0px 5px;
`;
const NavButtonIcon = styled.div``;
const NavButtonCenterIcon = styled.div`
  position: fixed;
  bottom: 25px;
`;
const NavButtonCenterText = styled.div`
  position: fixed;
  bottom: 3px;
  font-weight: 700;
  color: black;
  font-size: 15px;
`;
const NavButtonText = styled.div`
  font-weight: 700;
  font-size: 12px;
`;

export default function BottomNav() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <BottomNavContainer>
      {isOpen ? (
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div style={{ fontSize: "14px" }}>
            결제, 환불, 서비스 이용 관련해서는 메일로 문의 주세요.​
          </div>
          <div style={{ fontSize: "14px" }}>
            고객센터 : raditech.campus@gmail.com
          </div>
        </Modal>
      ) : (
        ""
      )}
      <NavButton onClick={() => handleOpenModal()}>
        <NavButtonIcon>
          <Phone />
        </NavButtonIcon>
        <NavButtonText>고객센터</NavButtonText>
      </NavButton>
      <NavButton onClick={() => router.push("/mypage")}>
        <NavButtonIcon>
          <MyHome />
        </NavButtonIcon>
        <NavButtonText>마이룸</NavButtonText>
      </NavButton>
      <NavButton onClick={() => router.push("/")}>
        <NavButtonCenterIcon>
          <Logo />
        </NavButtonCenterIcon>
        <NavButtonCenterText>홈</NavButtonCenterText>
      </NavButton>
      <NavButton onClick={() => router.push("/gosi")}>
        <NavButtonIcon>
          <Kuk />
        </NavButtonIcon>
        <NavButtonText>국가고시</NavButtonText>
      </NavButton>
      <NavButton onClick={() => router.push("/job")}>
        <NavButtonIcon>
          <Gang />
        </NavButtonIcon>
        <NavButtonText>취업특강</NavButtonText>
      </NavButton>
    </BottomNavContainer>
  );
}
