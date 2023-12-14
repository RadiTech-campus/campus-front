import React, { Fragment } from "react";
import styled from "@emotion/styled";
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
  font-size: 16px;
  margin-top: 10px;
  margin-left: 10px;
`;

const Tag = styled.div`
  @media (max-width: 650px) {
    border: 1px solid #a2a2a2;
    border-radius: 60px;
    margin-right: 10px;
    padding: 3px 6px;
    font-weight: 400;
  }
`;

const ClassCardsContainer = styled.div`
  @media (max-width: 650px) {
    display: flex;
    /* flex-wrap: nowrap;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    } */
    padding: 0px 5px;
  }
  padding: 0px 0px 20px;
  display: flex;
  flex-wrap: wrap;
`;
const ClassCard = styled.div`
  margin: 10px;
  width: 29%;
  text-decoration: none;
  border-radius: 10px;
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
const ClassImage = styled.div`
  @media (max-width: 650px) {
  }
  height: 180px;
  position: relative;
  > img {
    @media (max-width: 650px) {
      border-radius: 20px 20px 0 0;
      width: 100%;
    }
    border-radius: 10px;
  }
`;
const ClassTitle = styled.div`
  @media (max-width: 650px) {
    font-size: 3.2vw;
    font-weight: 700;
    padding: 0 0 0 10px;
    margin: 5px 0 3px 0;
    /* line-height: 28.96px; */
    color: #0b0d0f;
  }
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0px 0px 0px;
  padding: 10px 5px 0px;
  color: black;
`;

const ClassDesc = styled.div`
  @media (max-width: 650px) {
    font-size: 3vw;
    font-weight: 700;
    padding: 0 0 0 10px;
    margin: 0 0 10px 0;
    /* line-height: 26.06px; */
    color: #818181;
  }
  font-size: 16px;
  padding: 10px 5px 0px;
  color: #888888c1;
  margin: 5px 0px 0px 0px;
`;

export default function Gosi() {
  return (
    <div>
      <img src="/job/job.png" alt="image" style={{ width: "100%" }} />
      <LectureListContainer>
        <TitleContainer>
          <MainTitle>이론 & 3개년 기출 강의 ✍️</MainTitle>
          <Tags>
            <Tag>전체강의</Tag>
            <Tag>이론강의</Tag>
            <Tag>기출강의</Tag>
          </Tags>
        </TitleContainer>
        <ClassCardsContainer>
          <>
            <ClassCard>
              <Link
                href={{
                  pathname: `/`,
                }}
              >
                <img
                  // src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}.jpeg`}
                  src={`/job/chi.png`}
                  // alt={li.secondCat}
                  style={{ width: "100%", borderRadius: "20px 20px 0 0" }}
                />

                <ClassTitle>타이틀</ClassTitle>
                <ClassDesc>비혈관계 중재적시술</ClassDesc>
                {/* <ClassTags>
                  {li?.iTags?.split(" ").map((li, i) =>
                    i === 0 || i === 1 ? (
                      <ClassTag
                        key={i}
                        style={{
                          backgroundColor: "gray",
                          marginRight: "5px",
                        }}
                      >
                        {li}
                      </ClassTag>
                    ) : (
                      ""
                    ),
                  )}
                </ClassTags> */}
              </Link>
            </ClassCard>
            <ClassCard>
              <Link
                href={{
                  pathname: `/`,
                }}
              >
                <img
                  // src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}.jpeg`}
                  src={`/job/chi.png`}
                  // alt={li.secondCat}
                  style={{ width: "100%", borderRadius: "20px 20px 0 0" }}
                />

                <ClassTitle>타이틀</ClassTitle>
                <ClassDesc>비혈관계 중재적시술</ClassDesc>
                {/* <ClassTags>
                  {li?.iTags?.split(" ").map((li, i) =>
                    i === 0 || i === 1 ? (
                      <ClassTag
                        key={i}
                        style={{
                          backgroundColor: "gray",
                          marginRight: "5px",
                        }}
                      >
                        {li}
                      </ClassTag>
                    ) : (
                      ""
                    ),
                  )}
                </ClassTags> */}
              </Link>
            </ClassCard>
            <ClassCard>
              <Link
                href={{
                  pathname: `/`,
                }}
              >
                <img
                  // src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}.jpeg`}
                  src={`/job/chi.png`}
                  // alt={li.secondCat}
                  style={{ width: "100%", borderRadius: "20px 20px 0 0" }}
                />

                <ClassTitle>타이틀</ClassTitle>
                <ClassDesc>비혈관계 중재적시술</ClassDesc>
                {/* <ClassTags>
                  {li?.iTags?.split(" ").map((li, i) =>
                    i === 0 || i === 1 ? (
                      <ClassTag
                        key={i}
                        style={{
                          backgroundColor: "gray",
                          marginRight: "5px",
                        }}
                      >
                        {li}
                      </ClassTag>
                    ) : (
                      ""
                    ),
                  )}
                </ClassTags> */}
              </Link>
            </ClassCard>
            <ClassCard>
              <Link
                href={{
                  pathname: `/`,
                }}
              >
                <img
                  // src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}.jpeg`}
                  src={`/job/chi.png`}
                  // alt={li.secondCat}
                  style={{ width: "100%", borderRadius: "20px 20px 0 0" }}
                />

                <ClassTitle>타이틀</ClassTitle>
                <ClassDesc>비혈관계 중재적시술</ClassDesc>
                {/* <ClassTags>
                  {li?.iTags?.split(" ").map((li, i) =>
                    i === 0 || i === 1 ? (
                      <ClassTag
                        key={i}
                        style={{
                          backgroundColor: "gray",
                          marginRight: "5px",
                        }}
                      >
                        {li}
                      </ClassTag>
                    ) : (
                      ""
                    ),
                  )}
                </ClassTags> */}
              </Link>
            </ClassCard>
          </>
        </ClassCardsContainer>
      </LectureListContainer>
    </div>
  );
}
