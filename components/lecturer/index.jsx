import styled from "@emotion/styled";
import React from "react";

const LecturerContainer = styled.div`
  padding: 10px 40px;
`;

const InfoTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0px;
`;
const InfoLecturer = styled.div``;
const InfoRightLecturer = styled.div`
  padding: 20px 40px;
`;
const InfoRightTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px;
`;
const InfoRightContent = styled.div`
  font-size: 16px;
  margin-bottom: 3px;
`;

export default function Lecturer() {
  return (
    <LecturerContainer>
      <InfoTitle>레디테크(RadiTech)</InfoTitle>
      <InfoLecturer>
        <InfoRightTitle>[소개]</InfoRightTitle>
        <InfoRightContent>
          빅5 대학병원 방사선사 10년 이상 재직 중
        </InfoRightContent>
        <InfoRightTitle>[학력]</InfoRightTitle>
        <InfoRightContent>방사선분야 박사학위 취득 </InfoRightContent>
        <InfoRightContent>방사선학과 국가고시 특강 다수 출강</InfoRightContent>
        <InfoRightTitle>[자격증]</InfoRightTitle>
        <InfoRightContent>
          방사선사 면허증, RI, 미국초음파자격증 (ARDMS), 투시전문방사선사 등
          방사선 분야 자격증 취득
        </InfoRightContent>
        <InfoRightTitle>[대외 활동]</InfoRightTitle>
        <InfoRightContent>대한방사선사협회 및 전문학회 활동</InfoRightContent>
        <InfoRightTitle>[연구]</InfoRightTitle>
        <InfoRightContent>
          SCI급 논문 13편, SCOPUS 논문 2편, KCI 논문 7편 방사선학회 12편등
          활발한 연구 활동
        </InfoRightContent>
      </InfoLecturer>
    </LecturerContainer>
  );
}
