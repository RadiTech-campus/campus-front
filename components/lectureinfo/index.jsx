import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

const LectureInfoContainer = styled.div`
  padding: 10px 40px;
`;

const InfoTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0px;
`;
const ClassImage1 = styled.div`
  /* height: 250px; */
  width: 100%;
  height: 893px;
  position: relative;
  > img {
    /* padding: 20px; */
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ClassImage2 = styled.div`
  /* height: 250px; */
  width: 100%;
  height: 260px;
  position: relative;
  /* > img {
    border-radius: 10px;
  } */
`;
const ClassImage3 = styled.div`
  /* height: 250px; */
  width: 100%;
  height: 1008px;
  margin-top: 80px;
  position: relative;
  /* > img {
    border-radius: 10px;
  } */
`;

export default function LectureInfo({ lid, classData, classtype }) {
  console.log(
    "sad",
    classtype === "기출"
      ? classData.find((li) => li.code === lid).gPreview
      : classData.find((li) => li.code === lid).lPreview,
  );
  return (
    <LectureInfoContainer>
      {/* <InfoTitle>강의소개</InfoTitle> */}
      <ClassImage1>
        <Image
          //   src={`/${lid}.jpeg`}
          src={`/detail/${lid}.png`}
          alt="메인 배경 이미지"
          style={{ objectFit: "cover" }}
          fill
        />
      </ClassImage1>
      <ClassImage2>
        <Image
          //   src={`/${lid}.jpeg`}
          src={`/detail/eye.png`}
          alt="메인 배경 이미지"
          style={{ objectFit: "cover" }}
          fill
        />
      </ClassImage2>
      <PreviewContainer>
        <iframe
          src={`https://player.vimeo.com/video/${
            classtype === "기출"
              ? classData.find((li) => li.code === lid).gPreview
              : classData.find((li) => li.code === lid).lPreview
          }`}
          width="840"
          height="564"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </PreviewContainer>
      <ClassImage3>
        <Image
          //   src={`/${lid}.jpeg`}
          src={`/detail/price.png`}
          alt="메인 배경 이미지"
          style={{ objectFit: "cover" }}
          fill
        />
      </ClassImage3>
    </LectureInfoContainer>
  );
}
