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
  margin: 15px auto;
  width: 1160px;
`;

const MainTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  @media (max-width: 650px) {
    font-size: 3.5vw;
    color: #0b0d0f;
    font-weight: 700;
    /* line-height: 34.75px; */
    letter-spacing: -3%;
    padding: 5px 15px;
    margin: 0;
  }
`;

const ClassCardsContainer = styled.div`
  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    background-color: #ecf2fd;
    margin: 0 10px 20px;
    padding: 0px 10px 20px 10px;
    border-radius: 20px;
  }
  padding: 0px 0px 20px;
  display: flex;
  flex-wrap: wrap;
`;
const ClassCard = styled.div`
  @media (max-width: 650px) {
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
    border-radius: 8px;
    margin: 0 auto;
    width: 42%;
    height: 169px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  a {
    @media (max-width: 650px) {
    }
    text-decoration: none;
    border-radius: 10px;
  }
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px 30px;
`;
const DescriptionLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
`;
const DescriptionText = styled.div`
  font-weight: 400;
  font-size: 3.2vw;
  line-height: 24px;
`;

const DescriptionRight = styled.div`
  display: flex;
  justify-content: center;
  width: 40%;
`;

const ClassCardCircle = styled.div`
  @media (max-width: 650px) {
    width: 75px;
    height: 75px;
    background-color: #f2f3f5;
    color: #818181;
    font-weight: 700;
    font-size: 3.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  a {
    @media (max-width: 650px) {
    }
    text-decoration: none;
    border-radius: 10px;
  }
`;

const ApplyButton = styled.div`
  font-size: 2.7vw;
  font-weight: 700;
  width: 70%;
  height: 30px;
  border-radius: 60px;
  background-color: #2b66f5;
  color: white;
  line-height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LectureListBox({
  category,
  mainTitle,
  description,
  classData,
}) {
  const isMobile = useIsMobile();
  return (
    <LectureListContainer>
      <MainTitle>{mainTitle}</MainTitle>

      <ClassCardsContainer>
        <Description>
          <DescriptionLeft>
            <DescriptionText>레디테크 자체제작</DescriptionText>
            <DescriptionText>방사선사 국가고시 모의고사</DescriptionText>
            <DescriptionText>무료 제공중</DescriptionText>
            <div style={{ width: "30px", borderTop: "3px solid black" }}></div>
          </DescriptionLeft>
          <DescriptionRight>
            <img src="/step.png" alt="image" style={{ width: "80%" }} />
          </DescriptionRight>
        </Description>
        {classData?.map((li, i) => (
          <div style={{ display: "flex" }}>
            <ClassCard>
              {/* <Link
              href={{
                pathname: `/lecture/${li.code}`,
                query: { classtype: "강의", title: li.secondCat },
              }}
            ></Link> */}
              <ClassCardCircle>2 교시</ClassCardCircle>
              <ApplyButton>응시하기</ApplyButton>
            </ClassCard>
            <ClassCard>
              {/* <Link
              href={{
                pathname: `/lecture/${li.code}`,
                query: { classtype: "강의", title: li.secondCat },
              }}
            ></Link> */}
              <ClassCardCircle>3 교시</ClassCardCircle>
              <ApplyButton>응시하기</ApplyButton>
            </ClassCard>
          </div>
        ))}
      </ClassCardsContainer>
    </LectureListContainer>
  );
}
