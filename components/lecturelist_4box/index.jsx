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
    font-size: 3.7vw;
    color: #0b0d0f;
    font-weight: 700;
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
    width: 44%;
    /* height: 223px; */
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
    padding: 0px;
    /* height: 60%; */
    /* width: 20%; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
  > img {
    @media (max-width: 650px) {
      width: 50%;
    }
  }
`;
const ClassTitle = styled.div`
  @media (max-width: 650px) {
    font-size: 3.7vw;
    font-weight: 700;
    padding: 0;
    margin: 0 0 30px 0;
    height: 40%;
    display: flex;
    align-items: start;
    justify-content: center;
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
                <img src={`/hos/${li.code}.png`} alt={li.secondCat} />
              </ClassImage>
              <ClassTitle>
                {i === 0 && "서울아산/삼성병원"}
                {i === 1 && "성모병원"}
                {i === 2 && "서울대병원"}
                {i === 3 && "연세의료원"}
              </ClassTitle>
            </Link>
          </ClassCard>
        ))}
      </ClassCardsContainer>
    </LectureListContainer>
  );
}
