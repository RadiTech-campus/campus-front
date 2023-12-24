import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useIsMobile } from "../../hooks/useIsMobile";

const LectureListContainer = styled.div`
  @media (max-width: 650px) {
    width: 100%;
    margin: 0px auto;
  }
  margin: 100px auto 0px;
  /* width: 1160px; */
`;

const TitleContainer = styled.div`
  background-color: #f59f29;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer1 = styled.div`
  background-color: white;
  width: 80%;
  display: flex;
  justify-content: center;
  margin-top: -10px;
  margin-bottom: 60px;
  padding-top: 10px;
  padding-bottom: 20px;
  > a {
    background-color: #6375ff;
    width: 80%;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 4.5vw;
    font-weight: 700;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
  }
`;

const ButtonContainer2 = styled.div`
  background-color: white;
  width: 80%;
  display: flex;
  justify-content: center;
  margin-top: -10px;
  margin-bottom: 60px;
  padding-top: 10px;
  padding-bottom: 20px;
  > a {
    background-color: #83a446;
    width: 80%;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 4.5vw;
    font-weight: 700;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
  }
`;

export default function Events() {
  const isMobile = useIsMobile();
  return (
    <LectureListContainer>
      {isMobile && (
        <img
          src="/long.png"
          alt="image"
          style={{ width: "100%", position: "relative" }}
        />
      )}
      {!isMobile && (
        <img
          src="/event/PC.png"
          alt="image"
          style={{ width: "100%", position: "relative" }}
        />
      )}

      {/* <TitleContainer>
        <img src="/event/1.png" alt="image" style={{ width: "100%" }} />
        <img src="/event/2.png" alt="image" style={{ width: "80%" }} />

        <ButtonContainer1>
          <Link
            href={{
              pathname: `/regist`,
              query: { id: 2 },
            }}
          >
            구독하기
          </Link>
        </ButtonContainer1>
        <img src="/event/3.png" alt="image" style={{ width: "80%" }} />
        <ButtonContainer2>
          <Link
            href={{
              pathname: `/regist`,
              query: { id: 3 },
            }}
          >
            구독하기
          </Link>
        </ButtonContainer2>
      </TitleContainer> */}
    </LectureListContainer>
  );
}
