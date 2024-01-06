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
`;

const TitleContainer = styled.div`
  @media (max-width: 650px) {
    background-color: #01ff47;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -5px;
  }
  display: flex;
  background-color: #01ff47;
  margin: -5px 0px 0px;
  justify-content: center;
`;

const ButtonContainer1 = styled.div`
  background-color: white;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: -10px 10px 60px;
  padding-top: 10px;
  padding-bottom: 10px;
  > a {
    background-color: #6375ff;
    width: 75%;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 1.2vw;
    font-weight: 700;
    padding: 10px 20px;
    margin-top: 20px;
    text-align: center;
    text-decoration: none;
  }
  @media (max-width: 650px) {
    background-color: white;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      margin-top: 35px;
      text-align: center;
      text-decoration: none;
    }
  }
`;

const ButtonContainer2 = styled.div`
  background-color: white;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: -10px 10px 60px;
  padding-top: 10px;
  padding-bottom: 10px;

  > a {
    background-color: #83a446;
    width: 75%;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 1.2vw;
    font-weight: 700;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
  }
  @media (max-width: 650px) {
    background-color: white;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      margin-top: 35px;
      text-align: center;
      text-decoration: none;
    }
  }
`;
const ButtonContainer3 = styled.div`
  background-color: white;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: -10px 10px 60px;
  padding-top: 10px;
  padding-bottom: 10px;

  > a {
    background-color: #83a446;
    width: 75%;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 1.2vw;
    font-weight: 700;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
  }
  @media (max-width: 650px) {
    background-color: white;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -10px;
    margin-bottom: 60px;
    padding-top: 10px;
    padding-bottom: 20px;
    > a {
      background-color: #e96962;
      width: 80%;
      border-radius: 5px;
      border: none;
      color: white;
      font-size: 4.5vw;
      font-weight: 700;
      padding: 10px 20px;
      margin-top: 35px;
      text-align: center;
      text-decoration: none;
    }
  }
`;

export default function Events() {
  const isMobile = useIsMobile();
  return (
    <LectureListContainer>
      {isMobile && (
        <>
          <img
            src="/event2/mo2-1.png"
            alt="image"
            style={{ width: "100%", position: "relative" }}
          />
          <img
            src="/event2/mo2-2.png"
            alt="image"
            style={{ width: "100%", position: "relative" }}
          />
        </>
      )}
      {!isMobile && (
        <img
          src="/event/pc1.png"
          alt="image"
          style={{ width: "100%", position: "relative" }}
        />
      )}

      <TitleContainer>
        <ButtonContainer1>
          <img src="/event2/2-1.png" alt="image" style={{ width: "80%" }} />
          <Link
            href={{
              pathname: `/regist`,
              query: { id: 4 },
            }}
          >
            구독하기
          </Link>
        </ButtonContainer1>

        <ButtonContainer2>
          <img src="/event2/2-2.png" alt="image" style={{ width: "80%" }} />
          <Link
            href={{
              pathname: `/regist`,
              query: { id: 5 },
            }}
          >
            구독하기
          </Link>
        </ButtonContainer2>

        <ButtonContainer3>
          <img src="/event2/2-3.png" alt="image" style={{ width: "80%" }} />
          <Link
            href={{
              pathname: `/regist`,
              query: { id: 6 },
            }}
          >
            구독하기
          </Link>
        </ButtonContainer3>
      </TitleContainer>
    </LectureListContainer>
  );
}
