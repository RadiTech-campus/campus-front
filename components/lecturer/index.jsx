import styled from "@emotion/styled";
import React from "react";

const LecturerContainer = styled.div`
  padding: 30px 140px;
  margin-bottom: 50px;
  @media (max-width: 650px) {
    padding: 10px 15px;
  }
`;

const InfoTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0px;
  @media (max-width: 650px) {
    font-size: 4.3vw;
    color: #666666;
    font-weight: 700;
  }
`;

const InfoRightTitle = styled.button`
  font-size: 22px;
  background-color: #e96962;
  font-weight: 700;
  color: white;
  text-align: center;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 5px;
  border: none;
  @media (max-width: 650px) {
    font-size: 3.5vw;
    background-color: #e96962;
    color: white;
    text-align: center;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 20px;
    border: none;
  }
`;
const InfoRightContent = styled.div`
  font-size: 20px;
  color: #666666;
  @media (max-width: 650px) {
    font-size: 3.5vw;
    color: #666666;
  }
`;

export default function Lecturer() {
  return (
    <LecturerContainer>
      <InfoTitle>레디테크(RadiTech)</InfoTitle>
      <InfoRightContent>
        빅5 대학병원 방사선사 10년 이상 재직 중
      </InfoRightContent>
      <InfoRightTitle>학력</InfoRightTitle>
      <InfoRightContent>방사선분야 박사학위 취득 </InfoRightContent>
      <InfoRightTitle>자격증</InfoRightTitle>
      <InfoRightContent>
        방사선사 면허증, RI, 미국초음파자격증 (ARDMS), 투시전문방사선사 등
        방사선 분야 자격증 취득
      </InfoRightContent>
      <InfoRightTitle>연구</InfoRightTitle>
      <InfoRightContent>SCI급 논문 13편, SCOPUS 논문 2편,</InfoRightContent>
      <InfoRightContent>
        KCI 논문 7편 방사선학회 12편등 활발한 연구 활동
      </InfoRightContent>
      <InfoRightTitle>대외 활동</InfoRightTitle>
      <InfoRightContent>대한방사선사협회 및 전문학회 활동</InfoRightContent>
      <InfoRightContent>방사선학과 국가고시 특강 다수 출강</InfoRightContent>
    </LecturerContainer>
  );
}
