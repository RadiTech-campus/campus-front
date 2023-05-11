import styled from "@emotion/styled";
import React from "react";

const InfoTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 10px 40px;
`;
const InfoLecturer = styled.div`
  display: flex;
`;
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
    <>
      <InfoTitle>강사 소개</InfoTitle>
      <InfoLecturer>
        <InfoRightLecturer>
          <InfoRightTitle>RadiTech심 선생님</InfoRightTitle>
          <InfoRightContent>엑셀 활용 & 데이터 분석 강사</InfoRightContent>
          <InfoRightContent>현) IGM 세계경영연구원 겸임교수</InfoRightContent>
          <InfoRightContent>현) TNF컨설팅 책임연구위원</InfoRightContent>
          <InfoRightContent>
            기타활동 : · 이마트, 삼성전기, KOTRA, 현대자동차 외 기업, 공공기관
            엑셀 강의
          </InfoRightContent>
        </InfoRightLecturer>
      </InfoLecturer>
    </>
  );
}
