import React, { useMemo } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useIsMobile } from "../../hooks/useIsMobile";

import { useGetLecturesByContentId } from "../../query/new/queries";

const LectureListContainer = styled.div`
  @media (max-width: 650px) {
    width: 100%;
    margin: 0px auto;
  }
  margin: 100px auto 0px;
  width: 1160px;
`;

const TitleContainer = styled.div`
  background-color: #f59f29;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 80%; */
`;

const ButtonContainer = styled.div`
  background-color: white;
  width: 80%;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  padding-bottom: 60px;
  margin-top: -10px;
`;

const SubButton1 = styled.button`
  background-color: #6375ff;
  width: 60%;
  border-radius: 15px;
  height: 120px;
  border: none;
  color: white;
  font-size: 50px;
  font-weight: 700;
`;
const SubButton2 = styled.button`
  background-color: #83a446;
  width: 60%;
  border-radius: 15px;
  height: 120px;
  border: none;
  color: white;
  font-size: 50px;
  font-weight: 700;
`;

export default function Job() {
  const isMobile = useIsMobile();

  const { data: lecturesData } = useGetLecturesByContentId(11);
  const lectureData = useMemo(() => lecturesData || [], [lecturesData]);
  return (
    <LectureListContainer>
      {isMobile && (
        <img
          src="/long.png"
          alt="image"
          style={{ width: "100%", position: "relative" }}
        />
      )}
      <TitleContainer>
        <img src="/event/1.png" alt="image" style={{ width: "100%" }} />
        <img src="/event/2.png" alt="image" style={{ width: "80%" }} />

        <ButtonContainer>
          <SubButton1
            onClick={() => {
              alert("버튼");
            }}
          >
            구독하기
          </SubButton1>
        </ButtonContainer>
        <img src="/event/3.png" alt="image" style={{ width: "80%" }} />
        <ButtonContainer>
          <SubButton2
            onClick={() => {
              alert("버튼");
            }}
          >
            구독하기
          </SubButton2>
        </ButtonContainer>
      </TitleContainer>
      {/* <TitleContainer>
        <MainTitle>자소서, 면접, 대학정보 ✍️</MainTitle>
        <Tags>
          <Tag>전체강의</Tag>
          <Tag>자소서/면접</Tag>
          <Tag>대학정보</Tag>
        </Tags>
      </TitleContainer>
      <ClassCardsContainer>
        {lectureData?.map((li, i) => (
          <ClassCard key={i}>
            <Link
              href={{
                pathname: `/lecture-new/${li.id}`,
              }}
            >
              <img
                src={`${li.thumbnailURL}`}
                alt={li.description}
                style={{ width: "100%", borderRadius: "20px 20px 0 0" }}
              />
              <ClassTitle>{li.lectureTitle}</ClassTitle>
              <ClassDesc>{li.description}</ClassDesc>
            </Link>
          </ClassCard>
        ))}
      </ClassCardsContainer> */}
    </LectureListContainer>
  );
}
