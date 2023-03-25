import React from "react";
import styled from "@emotion/styled";

const TopNavContainer = styled.div`
  padding: 0px 40px;
  display: flex;
  width: 1160px;
  margin: 0px auto;
  border-bottom: 0.1rem solid #e6e8eb;
`;

const TobNav = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
`;

export default function TopNav() {
  return (
    <TopNavContainer>
      <TobNav>Home</TobNav>
      <TobNav>MYpage</TobNav>
    </TopNavContainer>
  );
}
