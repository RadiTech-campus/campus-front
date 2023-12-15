import styled from "@emotion/styled";
import Image from "next/image";
import React, { Fragment } from "react";
import Link from "next/link";
import { useIsMobile } from "../../hooks/useIsMobile";
import Countdown from "../timer";

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

const Category = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: rgb(237, 35, 75);
  @media (max-width: 650px) {
    display: none;
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
const Description = styled.div`
  @media (max-width: 650px) {
    padding: 0;
    margin: 0;
  }
  font-size: 16px;
  margin-top: 10px;
  margin-left: 10px;
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
    width: 35%;
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

const ClassTags = styled.div`
  @media (max-width: 650px) {
    display: none;
  }
  font-size: 16px;
  margin-top: 10px;
  padding: 10px 5px 0px;
  display: flex;
  flex-wrap: wrap;
`;

const ClassTag = styled.span`
  @media (max-width: 650px) {
    font-size: 12px;
    margin-top: 10px;
  }
  font-size: 15px;
  color: #8f8f8f;
  padding: 5px 7px;
  border-radius: 5px;
  background-color: #e5e5e5 !important;
`;

export default function LectureList({
  category,
  mainTitle,
  description,
  classData,
}) {
  const isMobile = useIsMobile();
  return (
    <LectureListContainer>
      <TitleContainer>
        <Category>{category}</Category>
        <MainTitle>{mainTitle}</MainTitle>
        <Description>{description}</Description>
      </TitleContainer>
      <ClassCardsContainer>
        {classData?.map((li, i) => (
          <Fragment key={i}>
            <ClassCard>
              {li.pay === "기간" && (
                <Countdown targetDate={li.startDate} endDate={li.endDate} />
              )}
              <Link
                href={{
                  pathname: `/lecture/${li.code}`,
                  query: { classtype: "강의", title: li.secondCat },
                }}
              >
                {isMobile ? (
                  <img
                    src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}.jpeg`}
                    // src={`Rectangle.png`}
                    alt={li.secondCat}
                    style={{ width: "100%", borderRadius: "20px 20px 0 0" }}
                  />
                ) : (
                  <ClassImage>
                    <Image
                      src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}.jpeg`}
                      alt={li.secondCat}
                      style={{ objectFit: "cover" }}
                      fill
                    />
                  </ClassImage>
                )}
                <ClassTitle>
                  {isMobile ? (
                    <div key={i} style={{ marginBottom: "3px" }}>
                      {/* <div key={i}> */}
                      {li.secondCat?.split("!")[0]}
                      {/* 혈관조영 */}
                    </div>
                  ) : (
                    li.secondCat?.split("!").map((li, i) => (
                      <div key={i} style={{ marginBottom: "3px" }}>
                        {li}
                        {i === 0 ? "!" : ""}
                      </div>
                    ))
                  )}
                </ClassTitle>
                <ClassDesc>{li?.iDescription}</ClassDesc>
                {/* <ClassDesc>비혈관계 중재적시술</ClassDesc> */}
                <ClassTags>
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
                </ClassTags>
              </Link>
            </ClassCard>
            {li.code === "C_B01_P" ||
            li.code === "C_B02_P" ||
            li.code === "C_B03_P" ||
            li.code === "C_B04_P" ||
            li.code === "C_B05_P" ||
            li.code === "C_B06_P" ||
            li.code === "C_B07_P" ||
            li.code === "C_B08_P" ||
            li.code === "C_B09_P" ? (
              <ClassCard>
                <Link
                  href={{
                    pathname: `/lecture/${li.code}`,
                    query: { classtype: "기출", title: li.secondCat },
                  }}
                >
                  {isMobile ? (
                    <img
                      src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}_G.jpeg`}
                      // src={`Rectangle.png`}
                      alt="레디테크 캠퍼스"
                      style={{ width: "100%", borderRadius: "20px 20px 0 0" }}
                    />
                  ) : (
                    <ClassImage>
                      <Image
                        src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}_G.jpeg`}
                        alt="레디테크 캠퍼스"
                        style={{ objectFit: "cover" }}
                        fill
                      />
                    </ClassImage>
                  )}
                  <ClassTitle>
                    {isMobile ? (
                      <div style={{ marginBottom: "3px" }}>
                        {li.gTitle?.split("!")[0]}
                        {/* 혈관조영 */}
                      </div>
                    ) : (
                      li.gTitle?.split("!").map((li, i) => (
                        <div key={i} style={{ marginBottom: "3px" }}>
                          {li}
                          {i === 0 ? "!" : ""}
                        </div>
                      ))
                    )}
                  </ClassTitle>
                  <ClassDesc>{li.gDescription}</ClassDesc>
                  {/* <ClassDesc>비혈관계 중재적시술</ClassDesc> */}

                  <ClassTags>
                    {li?.gTags?.split(" ").map((li, i) => (
                      <ClassTag
                        key={i}
                        style={{
                          backgroundColor: "gray",
                          marginRight: "5px",
                        }}
                      >
                        {li}
                      </ClassTag>
                    ))}
                  </ClassTags>
                </Link>
              </ClassCard>
            ) : null}
          </Fragment>
        ))}
      </ClassCardsContainer>
    </LectureListContainer>
  );
}
