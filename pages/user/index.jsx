import styled from "@emotion/styled";
import React from "react";
import Header from "../../components/header";

const UserContainer = styled.div``;
const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
`;
const MainTitle = styled.div`
  font-size: 70px;
  font-weight: bolder;
`;
const SubTitle = styled.div`
  font-size: 40px;
`;
const ClassButtons = styled.div``;
const ClassButton = styled.button`
  margin: auto 50px;
  padding: 20px 100px;
  border-radius: 20px;
  background-color: white;
  font-size: 40px;
`;

const HashTags = styled.div`
  display: flex;
  margin: 40px;
`;
const HashTag = styled.div`
  margin: auto 15px;
  font-size: 30px;
`;

const ClassCardsContainer = styled.div`
  padding: 30px 100px;
  display: flex;
  justify-content: space-evenly;
`;
const ClassCard = styled.div`
  flex: 0.22;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;
`;
const ClassImage = styled.div`
  height: 200px;
  background-color: lightgray;
`;
const ClassTitle = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  padding: 10px 0;
`;
const ClassContent = styled.div``;

export default function User() {
  return (
    <UserContainer>
      <Header />
      <UserContent>
        <TitleContainer>
          <MainTitle>All Course</MainTitle>
          <SubTitle>국시부터 BIG5 취업까지! 심지나쌤과 함께 하세요</SubTitle>
        </TitleContainer>
        <ClassButtons>
          <ClassButton>일반강의</ClassButton>
          <ClassButton>기출분석</ClassButton>
          <ClassButton>취업 트레이닝</ClassButton>
        </ClassButtons>
        <HashTags>
          <HashTag style={{ fontWeight: "900" }}># 전체</HashTag>
          <HashTag># 일촬</HashTag>
          <HashTag># 투시</HashTag>
          <HashTag># 심혈관 중재술</HashTag>
          <HashTag># 초음파</HashTag>
          <HashTag># CT</HashTag>
          <HashTag># MRI</HashTag>
          <HashTag># 핵의학</HashTag>
        </HashTags>
      </UserContent>
      <ClassCardsContainer>
        <ClassCard>
          <ClassImage>이미지</ClassImage>
          <ClassTitle>심혈관 중재술</ClassTitle>
          <ClassContent>
            요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약
          </ClassContent>
        </ClassCard>
        <ClassCard>
          <ClassImage>이미지</ClassImage>
          <ClassTitle>투시</ClassTitle>
          <ClassContent>
            요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약
          </ClassContent>
        </ClassCard>
        <ClassCard>
          <ClassImage>이미지</ClassImage>
          <ClassTitle>초음파</ClassTitle>
          <ClassContent>
            요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약
          </ClassContent>
        </ClassCard>
        <ClassCard>
          <ClassImage>이미지</ClassImage>
          <ClassTitle>핵의학</ClassTitle>
          <ClassContent>
            요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약요약
          </ClassContent>
        </ClassCard>
      </ClassCardsContainer>
    </UserContainer>
  );
}
