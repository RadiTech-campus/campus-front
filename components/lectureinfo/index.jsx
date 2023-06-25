import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

const LectureInfoContainer = styled.div`
  padding: 10px 40px;
  @media (max-width: 620px) {
    padding: 10px;
  }
`;

const ClassImage1 = styled.div`
  width: 100%;
  @media (max-width: 620px) {
    height: 100%;
  }
  height: 893px;
  position: relative;
  > img {
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ClassImage2 = styled.div`
  width: 100%;
  height: 260px;
  @media (max-width: 620px) {
    height: 100%;
  }
  position: relative;
`;
const ClassImage3 = styled.div`
  width: 100%;
  height: 1008px;
  margin-top: 80px;
  position: relative;
  @media (max-width: 620px) {
    height: 100%;
    margin: 40px auto 30px;
  }
`;

export default function LectureInfo({ lid, classData, classtype, preview }) {
  const isMobile = useIsMobile();

  return (
    <LectureInfoContainer>
      <ClassImage1>
        {isMobile ? (
          <img
            src={`/detail/${lid}${classtype === "기출" ? "_G" : ""}.png`}
            alt="메인 배경 이미지"
            style={{ width: "100%" }}
          />
        ) : (
          <Image
            src={`/detail/${lid}${classtype === "기출" ? "_G" : ""}.png`}
            alt="메인 배경 이미지"
            style={{ objectFit: "cover" }}
            fill
          />
        )}
      </ClassImage1>
      <ClassImage2>
        {isMobile ? (
          <img
            src={`/detail/eye.png`}
            alt="메인 배경 이미지"
            style={{ width: "100%" }}
          />
        ) : (
          <Image
            src={`/detail/eye.png`}
            alt="메인 배경 이미지"
            style={{ objectFit: "cover" }}
            fill
          />
        )}
      </ClassImage2>
      <PreviewContainer ref={preview}>
        <iframe
          src={`https://player.vimeo.com/video/${
            classtype === "기출"
              ? classData.find((li) => li.code === lid)?.gPreview
              : classData.find((li) => li.code === lid)?.lPreview
          }`}
          width="840"
          height={isMobile ? "200" : "546"}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </PreviewContainer>
      <ClassImage3>
        {isMobile ? (
          <img
            src={`/detail/price.png`}
            alt="메인 배경 이미지"
            style={{ width: "100%" }}
          />
        ) : (
          <Image
            src={`/detail/price.png`}
            alt="메인 배경 이미지"
            style={{ objectFit: "cover" }}
            fill
          />
        )}
      </ClassImage3>
    </LectureInfoContainer>
  );
}
