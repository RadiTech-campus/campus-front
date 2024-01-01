import React, { useMemo } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useGetLecturesByContentId } from "../../query/new/queries";

const LectureListContainer = styled.div`
  @media (max-width: 650px) {
    width: 100%;
    margin: 0px auto;
  }
  margin: 100px auto 0px;
  width: 1160px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px 0px;
  margin-top: 20px;
  @media (max-width: 650px) {
    padding: 5px 15px;
    margin: 0;
  }
`;

const MainTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  @media (max-width: 650px) {
    font-size: 4vw;
    color: #0b0d0f;
    font-weight: 700;
    letter-spacing: -3%;
    margin-top: 0px;
  }
`;
const Tags = styled.div`
  @media (max-width: 650px) {
    padding: 0;
    margin: 10px 0px;
    display: flex;
    justify-content: flex-start;
    color: #a2a2a2;
    font-size: 3.5vw;
  }
  display: flex;
  font-size: 24px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 20px;
  color: #a2a2a2;
`;

const Tag = styled.div`
  @media (max-width: 650px) {
    border: 1px solid #a2a2a2;
    border-radius: 60px;
    margin-right: 10px;
    padding: 3px 6px;
    font-weight: 400;
  }
  border: 1px solid #a2a2a2;
  border-radius: 60px;
  margin-right: 10px;
  padding: 5px 12px;
  font-weight: 400;
`;

const ClassCardsContainer = styled.div`
  @media (max-width: 650px) {
    display: flex;
    padding: 0px 5px;
  }
  padding: 0px 0px 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const ClassCard = styled.div`
  margin: 10px;
  width: 31%;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
  border-radius: 20px;
  @media (max-width: 650px) {
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
    border-radius: 20px;
    width: 45%;
    margin: 10px auto;
  }
  a {
    @media (max-width: 650px) {
    }
    text-decoration: none;
    border-radius: 10px;
  }
`;

const ClassTitle = styled.div`
  @media (max-width: 650px) {
    font-size: 3.2vw;
    font-weight: 700;
    padding: 0 0 0 10px;
    margin: 5px 0 3px 0;
    color: #0b0d0f;
  }
  font-size: 24px;
  font-weight: 600;
  margin: 10px 0px 0px 10px;
  padding: 10px 5px 0px;
  color: black;
`;

const ClassDesc = styled.div`
  @media (max-width: 650px) {
    font-size: 3vw;
    font-weight: 700;
    padding: 0 0 0 10px;
    margin: 0 0 10px 0;
    color: #818181;
  }
  font-size: 20px;
  padding: 10px 10px 0px;
  color: #888888c1;
  margin: 0px 0px 20px 10px;
`;

export default function Gosi() {
  const isMobile = useIsMobile();

  const { data: lecturesData1 } = useGetLecturesByContentId(1);
  const { data: lecturesData2 } = useGetLecturesByContentId(2);
  const { data: lecturesData3 } = useGetLecturesByContentId(3);
  const data = useMemo(
    () =>
      (lecturesData1 &&
        lecturesData2 && [...lecturesData1, ...lecturesData2]) ||
      [],
    [lecturesData1, lecturesData2],
  );
  return (
    <LectureListContainer>
      {isMobile && (
        <img src="/job/job.png" alt="image" style={{ width: "100%" }} />
      )}
      <TitleContainer>
        <MainTitle>이론 & 3개년 기출 강의 ✍️</MainTitle>
        <Tags>
          <Tag>전체강의</Tag>
          <Tag>이론강의</Tag>
          <Tag>기출강의</Tag>
        </Tags>
      </TitleContainer>
      <ClassCardsContainer>
        {data
          ?.sort((a, b) => (a.sorting > b.sorting ? 1 : -1))
          .map((li, i) => (
            <ClassCard key={i}>
              <Link
                href={{
                  pathname: `/lecture-new/${li.id}`,
                }}
              >
                <img
                  src={li.thumbnailURL}
                  alt={li.secondCat}
                  style={{ width: "100%", borderRadius: "20px 20px 0 0" }}
                />
                <ClassTitle>{li.lectureTitle}</ClassTitle>
                <ClassDesc>{li.description}</ClassDesc>
              </Link>
            </ClassCard>
          ))}
        {lecturesData3
          ?.sort((a, b) => (a.sorting > b.sorting ? 1 : -1))
          .map((li, i) => (
            <ClassCard key={i}>
              <Link
                href={{
                  pathname: `/lecture-new/${li.id}`,
                }}
              >
                <img
                  src={li.thumbnailURL}
                  alt={li.secondCat}
                  style={{ width: "100%", borderRadius: "20px 20px 0 0" }}
                />
                <ClassTitle>{li.lectureTitle}</ClassTitle>
                <ClassDesc>{li.description}</ClassDesc>
              </Link>
            </ClassCard>
          ))}
      </ClassCardsContainer>
    </LectureListContainer>
  );
}
