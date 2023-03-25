import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import Header from "../../components/header";

const LectureListContainer = styled.div`
  margin: 15px auto;
  width: 1160px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

const Category = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: rgb(237, 35, 75);
`;
const MainTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;
const Description = styled.div`
  font-size: 16px;
  margin-top: 10px;
  margin-left: 10px;
`;

const ClassCardsContainer = styled.div`
  padding: 30px 0px;
  display: flex;
  justify-content: space-evenly;
`;
const ClassCard = styled.div`
  flex: 0.23;
  border: 0.1rem solid #e6e8eb;
  border-radius: 10px;
  padding: 10px;
`;
const ClassImage = styled.div`
  height: 150px;
  position: relative;
  > img {
    border-radius: 10px;
  }
`;
const ClassTitle = styled.div`
  /* text-align: center; */
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0px 0px;
`;
const ClassContent = styled.div`
  font-size: 16px;
`;

export default function LectureList({
  category,
  mainTitle,
  description,
  classData,
}) {
  return (
    <LectureListContainer>
      {/* <UserContent> */}
      <TitleContainer>
        <Category>{category}</Category>
        <MainTitle>{mainTitle}</MainTitle>
        <Description>{description}</Description>
      </TitleContainer>

      <ClassCardsContainer>
        {classData?.map((li) => (
          <ClassCard>
            <ClassImage>
              <Image
                src={li.thumbnail}
                alt="메인 배경 이미지"
                // width={30}
                // height={30}
                style={{ objectFit: "cover" }}
                fill
                //   style={{ borderRadius: "50%", marginRight: "5px" }}
              />
              {/* {li.thumbnail} */}
            </ClassImage>
            <ClassTitle>{li.title}</ClassTitle>
            <ClassContent>{li.content}</ClassContent>
          </ClassCard>
        ))}
      </ClassCardsContainer>
    </LectureListContainer>
  );
}
