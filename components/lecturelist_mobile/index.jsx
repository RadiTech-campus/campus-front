import styled from "@emotion/styled";
import React from "react";
import Link from "next/link";

const LectureListContainer = styled.div`
  @media (max-width: 650px) {
    width: 100%;
  }
  margin: 0px auto;
  width: 1160px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px 0px;
  margin-top: 20px;
  @media (max-width: 650px) {
    padding: 10px 15px;
    margin: 0;
  }
`;

const MainTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  @media (max-width: 650px) {
    font-size: 3.5vw;
    color: #0b0d0f;
    font-weight: 700;
    letter-spacing: -3%;
    margin-top: 0px;
  }
`;

const ClassCardsContainer = styled.div`
  @media (max-width: 650px) {
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  padding: 0px 0px 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const ClassCard = styled.div`
  margin: 10px;
  width: 23%;
  text-decoration: none;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
  @media (max-width: 650px) {
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
    border-radius: 20px;
    width: 43%;
    flex: 0 0 auto;
    margin: 0 0 0 10px;
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
    font-size: 2.8vw;
    font-weight: 700;
    padding: 0 30px 0px 10px;
    margin: 0 0 10px 0;
    /* line-height: 26.06px; */
    color: #818181;
  }
  font-size: 20px;
  padding: 10px 10px 0px;
  color: #888888c1;
  margin: 0px 0px 20px 10px;
`;

export default function LectureListMobile({ mainTitle, classData }) {
  return (
    <LectureListContainer>
      <TitleContainer>
        <MainTitle>{mainTitle}</MainTitle>
      </TitleContainer>
      <ClassCardsContainer>
        {classData?.map((li, i) => (
          <ClassCard key={i}>
            <Link
              href={{
                pathname: `/lecture-new/${li.id}`,
              }}
            >
              <img
                src={`${li.thumbnailURL}`}
                alt={li.lectureTitle}
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
