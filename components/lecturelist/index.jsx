import styled from "@emotion/styled";
import Image from "next/image";
import React, { Fragment } from "react";
import Link from "next/link";
import { useIsMobile } from "../../hooks/useIsMobile";

const LectureListContainer = styled.div`
  @media (max-width: 620px) {
    /* width: 620px; */
    width: 100%;
    margin: 0 auto;
  }
  margin: 15px auto;
  width: 1160px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px 0px;
  margin-top: 20px;
`;

const Category = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: rgb(237, 35, 75);
  @media (max-width: 620px) {
    font-size: 14px;
  }
`;
const MainTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  @media (max-width: 620px) {
    font-size: 20px;
  }
`;
const Description = styled.div`
  font-size: 16px;
  margin-top: 10px;
  margin-left: 10px;
`;

const ClassCardsContainer = styled.div`
  @media (max-width: 620px) {
    justify-content: start;
  }
  padding: 0px 0px 20px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-evenly; */
  a {
    @media (max-width: 620px) {
      justify-content: space-around;
      width: 45%;
      margin: 10px 5px 5px 10px;
      padding: 0px;
      /* background-color: green; */
    }
    text-decoration: none;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    width: 29%;
  }
`;
const ClassCard = styled.div`
  @media (max-width: 620px) {
    width: 100%;
    margin: 0 auto;
    /* background-color: red; */
  }
`;
const ClassImage = styled.div`
  @media (max-width: 620px) {
    height: 100px;
  }
  height: 180px;
  position: relative;
  > img {
    @media (max-width: 620px) {
      border-radius: 5px;
    }
    border-radius: 10px;
  }
`;
const ClassTitle = styled.div`
  /* text-align: center; */
  @media (max-width: 620px) {
    font-size: 18px;
    margin: 0px 0px 0px 0px;
    padding: 10px 5px 0px;
    /* background-color: red; */
  }
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0px 0px 0px;
  padding: 10px 5px 0px;
  color: black;
`;

const ClassDesc = styled.div`
  /* text-align: center; */
  font-size: 16px;
  @media (max-width: 620px) {
    font-size: 14px;
    /* display: none; */
    width: 100%;
    padding: 10px 5px;
    line-height: 140%;
  }
  /* font-weight: bold; */
  padding: 10px 5px 0px;
  color: #888888c1;
  margin: 5px 0px 0px 0px;
`;

const ClassTags = styled.div`
  @media (max-width: 620px) {
    /* display: none; */
    padding: 0px 5px 0px;
    margin-top: 0px;
  }
  font-size: 16px;
  margin-top: 10px;
  padding: 10px 5px 0px;
  display: flex;
  flex-wrap: wrap;
`;

const ClassTag = styled.span`
  @media (max-width: 620px) {
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
      {/* <UserContent> */}
      <TitleContainer>
        <Category>{category}</Category>
        <MainTitle>{mainTitle}</MainTitle>
        <Description>{description}</Description>
      </TitleContainer>

      <ClassCardsContainer>
        {classData?.map((li, i) => (
          <Fragment key={i}>
            <Link
              href={{
                pathname: `/lecture/${li.code}`,
                query: { classtype: "강의", title: li.secondCat },
              }}
            >
              <ClassCard>
                <ClassImage>
                  {isMobile ? (
                    <img
                      src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}.jpeg`}
                      alt={li.secondCat}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <Image
                      src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}.jpeg`}
                      alt={li.secondCat}
                      // width={30}
                      // height={30}
                      style={{ objectFit: "cover" }}
                      fill
                      //   style={{ borderRadius: "50%", marginRight: "5px" }}
                    />
                  )}

                  {/* {li.thumbnail} */}
                </ClassImage>
                <ClassTitle>
                  {isMobile ? (
                    <div key={i} style={{ marginBottom: "3px" }}>
                      {li.secondCat?.split("!")[0]}
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
                <ClassTags>
                  {li?.iTags?.split(" ").map((li, i) =>
                    i === 0 || i === 1 ? (
                      <ClassTag
                        key={i}
                        style={{ backgroundColor: "gray", marginRight: "5px" }}
                      >
                        {li}
                      </ClassTag>
                    ) : (
                      ""
                    ),
                  )}
                </ClassTags>
                {/* <ClassContent>{li.content}</ClassContent> */}
              </ClassCard>
            </Link>
            {li.code === "C_B01_P" ||
            li.code === "C_B02_P" ||
            li.code === "C_B03_P" ||
            li.code === "C_B04_P" ||
            li.code === "C_B05_P" ||
            li.code === "C_B06_P" ||
            li.code === "C_B07_P" ||
            li.code === "C_B08_P" ||
            li.code === "C_B09_P" ? (
              <Link
                href={{
                  pathname: `/lecture/${li.code}`,
                  query: { classtype: "기출", title: li.secondCat },
                }}
              >
                <ClassCard>
                  <ClassImage>
                    {isMobile ? (
                      <img
                        src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}_G.jpeg`}
                        alt="레디테크 캠퍼스"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <Image
                        src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}_G.jpeg`}
                        alt="레디테크 캠퍼스"
                        // width={30}
                        // height={30}
                        style={{ objectFit: "cover" }}
                        fill
                        //   style={{ borderRadius: "50%", marginRight: "5px" }}
                      />
                    )}

                    {/* {li.thumbnail} */}
                  </ClassImage>
                  <ClassTitle>
                    {isMobile ? (
                      <div style={{ marginBottom: "3px" }}>
                        {li.gTitle?.split("!")[0]}
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
                  {/* <ClassContent>{li.content}</ClassContent> */}
                  <ClassTags>
                    {li?.gTags?.split(" ").map((li, i) => (
                      <ClassTag
                        key={i}
                        style={{ backgroundColor: "gray", marginRight: "5px" }}
                      >
                        {li}
                      </ClassTag>
                    ))}
                  </ClassTags>
                </ClassCard>
              </Link>
            ) : null}
          </Fragment>
        ))}
      </ClassCardsContainer>
    </LectureListContainer>
  );
}
