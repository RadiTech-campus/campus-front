import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useMemo } from "react";

const DashBoardContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 40px;
  background-color: #0f3479;
  height: 100px;
`;

const MenuName = styled.div`
  color: #fbfeff;
  margin-left: 60px;
  font-size: larger;
  font-weight: bold;
`;

const UserName = styled.div`
  color: #fbfeff;
  font-weight: bold;
  margin-right: 60px;
  font-size: larger;
`;

const FirstContainer = styled.div`
  margin: -50px 40px 10px;
  display: flex;
`;

const StatTitle = styled.div`
  color: gray;
`;

const First1 = styled.div`
  flex: 0.2;
  background-color: #fbfeff;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
  height: 18vh;
`;
const First2 = styled.div`
  flex: 0.2;
  background-color: #fbfeff;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
`;
const First3 = styled.div`
  flex: 0.2;
  background-color: #fbfeff;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
`;
const First4 = styled.div`
  flex: 0.2;
  background-color: #fbfeff;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
`;
const First5 = styled.div`
  flex: 0.2;
  background-color: #fbfeff;
  border-radius: 10px;
  padding: 10px;
`;

const SecondContainer = styled.div`
  display: flex;
  height: 70vh;
  margin: 0px 40px 20px;
`;

const SecondLeft = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-right: 10px;
`;

const SecondTopLeft = styled.div`
  flex: 0.5;
  background-color: #fbfeff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;
const SecondSecondLeft = styled.div`
  flex: 0.5;
  background-color: #fbfeff;
  border-radius: 10px;
  padding: 10px;
`;

const SecondRight = styled.div`
  flex: 0.5;
  background-color: #fbfeff;
  border-radius: 10px;
  padding: 10px;
`;

export default function DashBoard() {
  return (
    <DashBoardContainer>
      <TopContainer>
        <MenuName>대시보드</MenuName>
        <UserName>유저이름</UserName>
      </TopContainer>
    </DashBoardContainer>
  );
}
