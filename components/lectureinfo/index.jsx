import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

const LectureInfoContainer = styled.div`
  padding: 10px 40px;
  @media (max-width: 650px) {
    padding: 10px;
  }
`;

const ClassImage1 = styled.div`
  width: 100%;
  @media (max-width: 650px) {
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
  @media (max-width: 650px) {
    height: 100%;
  }
  position: relative;
`;
const ClassImage3 = styled.div`
  width: 100%;
  height: 1008px;
  margin-top: 80px;
  position: relative;
  @media (max-width: 650px) {
    height: 100%;
    margin: 40px auto 30px;
  }
`;

export default function LectureInfo({ lid, classData, classtype, preview }) {
  const isMobile = useIsMobile();

  return (
    <LectureInfoContainer>
      <ClassImage1>
        <img
          src={`/detail/${lid}${classtype === "기출" ? "_G" : ""}.png`}
          alt="레디테크 캠퍼스"
          style={{ width: "100%" }}
        />
      </ClassImage1>
      <ClassImage2>
        <img
          src={`/detail/eye${lid?.substring(2, 3) === "H" ? "2" : ""}.png`}
          alt="레디테크 캠퍼스"
          style={{ width: "100%" }}
        />
      </ClassImage2>
      <PreviewContainer ref={preview}>
        <iframe
          width="840"
          height={isMobile ? "200" : "546"}
          src={`https://www.youtube.com/embed/${
            classtype === "기출"
              ? classData.find((li) => li.code === lid)?.gPreview
              : classData.find((li) => li.code === lid)?.lPreview
          }`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </PreviewContainer>
      <ClassImage3>
        <img
          src={`/detail/price.png`}
          alt="레디테크 캠퍼스"
          style={{ width: "100%" }}
        />
      </ClassImage3>
    </LectureInfoContainer>
  );
}
