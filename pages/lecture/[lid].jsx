import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import Lectures from "../../components/lectures";
import { useGetContentDetails } from "../../query/contents";

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
  const { lid, classtype, title } = router.query;

  const { data: contentDetailData } = useGetContentDetails(lid);
  const data = useMemo(
    () => contentDetailData?.Items || [],
    [contentDetailData, lid],
  );

  console.log("data", data);

  return (
    <LectureDetailContainer>
      <TopDetail>
        <TopLeftDetail>
          <ClassImage>
            <Image
              src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${lid}.jpeg`}
              alt="메인 배경 이미지"
              style={{ objectFit: "cover" }}
              fill
            />
          </ClassImage>
        </TopLeftDetail>
        <TopRightDetail>
          <ClassMainTitle>
            {lid?.slice(-1) === "F" && "#무료공개"} {`#${classtype}`}{" "}
            {`#${title}`}
          </ClassMainTitle>
          <ClassSubTitle>{`# ${title}`}</ClassSubTitle>
          <ClassContent>
            <ClassLeftContent>이용 기간</ClassLeftContent>
            <ClassRightContent>~2023.03.15</ClassRightContent>
          </ClassContent>
          <ClassContent>
            <ClassLeftContent>강의 분량</ClassLeftContent>
            <ClassRightContent>{data?.length} 개</ClassRightContent>
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
      {/* <InfoLectureContainer>
        <InfoLeftLecture>
          <InfoTime>동영상 174개</InfoTime>
          <InfoTime>총 28시간</InfoTime>
        </InfoLeftLecture>
        <InfoRightLecture>
          <InfoRightLectureButton onClick={handelHiddenAll}>
            강의 자료
          </InfoRightLectureButton>
        </InfoRightLecture>
      </InfoLectureContainer> */}
      <Lectures classData={data} classtype={classtype} />

      <Divider />
    </LectureDetailContainer>
  );
}
