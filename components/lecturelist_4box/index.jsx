import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useIsMobile } from "../../hooks/useIsMobile";

const LectureListContainer = styled.div`
  @media (max-width: 650px) {
    width: 100%;
  }
  margin: 15px auto;
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
    font-size: 24px;
    color: #0b0d0f;
    font-weight: 700;
    line-height: 34.75px;
    letter-spacing: -3%;
  }
`;

const ClassCardsContainer = styled.div`
  @media (max-width: 650px) {
    display: flex;
    justify-content: space-evenly;
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
    margin-bottom: 20px;
    width: 42%;
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
      height: 168px;
    }
    border-radius: 10px;
  }
`;
const ClassTitle = styled.div`
  @media (max-width: 650px) {
    font-size: 20px;
    font-weight: 700;
    padding: 0;
    margin: 0;
    line-height: 28.96px;
    text-align: center;
  }
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0px 0px 0px;
  padding: 10px 5px 0px;
  color: black;
`;

export default function LectureList4Box({
  category,
  mainTitle,
  description,
  classData,
}) {
  const isMobile = useIsMobile();
  return (
    <LectureListContainer>
      <TitleContainer>
        <MainTitle>{mainTitle}</MainTitle>
      </TitleContainer>

      <ClassCardsContainer>
        {classData?.map((li, i) => (
          <ClassCard>
            <Link
              href={{
                pathname: `/lecture/${li.code}`,
                query: { classtype: "강의", title: li.secondCat },
              }}
            >
              <ClassImage>
                {isMobile ? (
                  <img
                    src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}.jpeg`}
                    alt={li.secondCat}
                  />
                ) : (
                  <Image
                    src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${li.code}.jpeg`}
                    alt={li.secondCat}
                    style={{ objectFit: "cover" }}
                    fill
                  />
                )}
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
            </Link>
          </ClassCard>
        ))}
      </ClassCardsContainer>
    </LectureListContainer>
  );
}
