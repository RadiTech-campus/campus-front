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
  height: 1178px;
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
  height: 906px;
  position: relative;
  /* > img {
    border-radius: 10px;
  } */
`;

export default function LectureInfo() {
  return (
    <LectureInfoContainer>
      <InfoTitle>강의소개</InfoTitle>
      <ClassImage1>
        <Image
          //   src={`/${lid}.jpeg`}
          src={`/info1.png`}
          alt="메인 배경 이미지"
          style={{ objectFit: "cover" }}
          fill
        />
      </ClassImage1>
      <PreviewContainer>
        <iframe
          src="https://player.vimeo.com/video/825159712?h=c877949dd3"
          width="840"
          height="564"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        ></iframe>
      </PreviewContainer>
      <ClassImage2>
        <Image
          //   src={`/${lid}.jpeg`}
          src={`/info2.png`}
          alt="메인 배경 이미지"
          style={{ objectFit: "cover" }}
          fill
        />
      </ClassImage2>
    </LectureInfoContainer>
  );
}
