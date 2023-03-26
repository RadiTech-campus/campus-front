import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import Lectures from "../../components/lectures";

const LectureDetailContainer = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px; */
  margin: 0px auto;
  width: 1160px;
`;
const Divider = styled.div`
  border-bottom: 0.1rem solid #e6e8eb;
  margin: 20px 0px;
`;

const TopDetail = styled.div`
  display: flex;
  flex: 1;
`;

const TopLeftDetail = styled.div`
  flex: 0.5;
  padding: 40px;
`;

const ClassImage = styled.div`
  height: 300px;
  position: relative;
  /* > img {
    border-radius: 10px;
  } */
`;
const TopRightDetail = styled.div`
  flex: 0.5;
  padding: 40px 0px;
`;
const ClassMainTitle = styled.div`
  font-size: 16px;
`;
const ClassSubTitle = styled.div`
  margin: 15px 0px;
  font-size: 20px;
  font-weight: bold;
`;
const ClassContent = styled.div`
  display: flex;
  margin-top: 5px;
`;
const ClassLeftContent = styled.div`
  font-size: 14px;
  font-weight: bold;
  width: 100px;
`;
const ClassRightContent = styled.div`
  font-size: 14px;
`;

const InfoTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 10px 40px;
`;

const InfoLecturer = styled.div`
  display: flex;
`;
const InfoLeftLecturer = styled.div`
  padding: 20px 40px;
`;

const InfoImage = styled.div`
  height: 200px;
  width: 200px;
  position: relative;
  > img {
    border-radius: 50%;
  }
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

const InfoLectureContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
`;
const InfoLeftLecture = styled.div`
  display: flex;
`;
const InfoTime = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const InfoRightLecture = styled.div``;

const InfoRightLectureButton = styled.button`
  padding: 10px 20px;
  font-weight: bolder;
  background-color: white;
  border: 1px solid #4a63ff;
  color: #4a63ff;
  border-radius: 20px;
  cursor: pointer;
`;

export default function Lecture() {
  const router = useRouter();
  const { lid } = router.query;
  const [hiddenAll, setHiddenAll] = useState(true);
  const handelHiddenAll = () => {
    setHiddenAll(!hiddenAll);
  };
  return (
    <LectureDetailContainer>
      <TopDetail>
        <TopLeftDetail>
          <ClassImage>
            <Image
              src="https://cdn.news.unn.net/news/photo/202301/540181_346310_728.jpg"
              alt="메인 배경 이미지"
              style={{ objectFit: "cover" }}
              fill
            />
          </ClassImage>
        </TopLeftDetail>
        <TopRightDetail>
          <ClassMainTitle># 초음파</ClassMainTitle>
          <ClassSubTitle>
            초음파 : 영상 확인 부터 파악하기 메인타이틀메인타타이틀
          </ClassSubTitle>
          <ClassContent>
            <ClassLeftContent>이용 기간</ClassLeftContent>
            <ClassRightContent>~2023.03.15</ClassRightContent>
          </ClassContent>
          <ClassContent>
            <ClassLeftContent>강의 분량</ClassLeftContent>
            <ClassRightContent>강의 3개</ClassRightContent>
          </ClassContent>
          <ClassContent>
            <ClassLeftContent>강의 시간</ClassLeftContent>
            <ClassRightContent>4시간 +</ClassRightContent>
          </ClassContent>
        </TopRightDetail>
      </TopDetail>
      <Divider />
      <InfoTitle>강사 소개</InfoTitle>
      <InfoLecturer>
        <InfoLeftLecturer>
          <InfoImage>
            <Image
              src="https://cdn.news.unn.net/news/photo/202301/540181_346310_728.jpg"
              alt="메인 배경 이미지"
              style={{ objectFit: "cover" }}
              fill
            />
          </InfoImage>
        </InfoLeftLecturer>
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
      <Divider />
      <InfoTitle>강의 목록</InfoTitle>
      <InfoLectureContainer>
        <InfoLeftLecture>
          <InfoTime>동영상 174개</InfoTime>
          <InfoTime>총 28시간</InfoTime>
        </InfoLeftLecture>
        <InfoRightLecture>
          <InfoRightLectureButton onClick={handelHiddenAll}>
            전체 열기
          </InfoRightLectureButton>
        </InfoRightLecture>
      </InfoLectureContainer>
      <Lectures chapter={"#1 초음파란?"} hiddenAll={hiddenAll} />
      <Lectures chapter={"#2 음파음파"} hiddenAll={hiddenAll} />
      <Lectures chapter={"#3 파덕파덕"} hiddenAll={hiddenAll} />
      <Divider />
    </LectureDetailContainer>
  );
}
