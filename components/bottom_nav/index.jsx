import styled from "@emotion/styled";
import React from "react";
import Phone from "../icons/Phone";

const BottomNavContainer = styled.div`
  display: none;
  @media (max-width: 650px) {
    height: 107px;
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
  margin-bottom: 20px;
`;
const NavButtonIcon = styled.div``;
const NavButtonText = styled.div`
  font-weight: 700;
  font-size: 16px;
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
          <Phone />
        </NavButtonIcon>
        <NavButtonText>고객센터</NavButtonText>
      </NavButton>
      <NavButton>
        <NavButtonIcon>
          <Phone />
        </NavButtonIcon>
        <NavButtonText>고객센터</NavButtonText>
      </NavButton>
      <NavButton>
        <NavButtonIcon>
          <Phone />
        </NavButtonIcon>
        <NavButtonText>고객센터</NavButtonText>
      </NavButton>
      <NavButton>
        <NavButtonIcon>
          <Phone />
        </NavButtonIcon>
        <NavButtonText>고객센터</NavButtonText>
      </NavButton>
    </BottomNavContainer>
  );
}
