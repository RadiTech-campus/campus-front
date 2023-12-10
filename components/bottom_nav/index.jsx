import styled from "@emotion/styled";
import React from "react";
import Phone from "../icons/Phone";
import MyHome from "../icons/MyHome";
import Gang from "../icons/Gang";
import Logo from "../icons/Logo";
import Gosi from "../icons/gosi";

const BottomNavContainer = styled.div`
  display: none;
  @media (max-width: 650px) {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: end;
    position: fixed;
    bottom: 0;
    background-color: white;
    z-index: 1000;
  }
`;

const NavButton = styled.div`
  width: 80px;
  color: #a2a2a2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
`;
const NavButtonIcon = styled.div``;
const NavButtonText = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 19.36px;
`;

export default function BottomNav() {
  return (
    <BottomNavContainer>
      <NavButton>
        <NavButtonIcon>
          <Phone />
        </NavButtonIcon>
        <NavButtonText>고객센터</NavButtonText>
      </NavButton>
      <NavButton>
        <NavButtonIcon>
          <MyHome />
        </NavButtonIcon>
        <NavButtonText>마이룸</NavButtonText>
      </NavButton>
      <NavButton>
        <NavButtonIcon>
          <Logo />
        </NavButtonIcon>
        <NavButtonText>홈</NavButtonText>
      </NavButton>
      <NavButton>
        <NavButtonIcon>
          <Gosi />
        </NavButtonIcon>
        <NavButtonText>국가고시</NavButtonText>
      </NavButton>
      <NavButton>
        <NavButtonIcon>
          <Gang />
        </NavButtonIcon>
        <NavButtonText>취업특강</NavButtonText>
      </NavButton>
    </BottomNavContainer>
  );
}
