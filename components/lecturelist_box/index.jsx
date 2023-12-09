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
    background-color: #ecf2fd;
    margin: 0 20px;
    border-radius: 20px;
    height: 390px;
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
    margin: 0 15px;
    width: 234px;
    flex: 0 0 auto;
  }
  a {
    @media (max-width: 650px) {
    }
    text-decoration: none;
    border-radius: 10px;
  }
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
            ></Link>
            <button>응시하기</button>
          </ClassCard>
        ))}
      </ClassCardsContainer>
    </LectureListContainer>
  );
}
