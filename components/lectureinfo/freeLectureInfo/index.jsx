import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";

const LectureInfoContainer = styled.div`
  @media (max-width: 620px) {
    padding: 10px;
  }
  padding: 10px 40px;
`;

const ClassImage1 = styled.div`
  @media (max-width: 620px) {
    height: 100%;
  }
  width: 100%;
  > img {
  }
`;

const ClassImage2 = styled.div`
  @media (max-width: 620px) {
    height: 100%;
  }
  width: 100%;
`;

const ClassImage3 = styled.div`
  @media (max-width: 620px) {
    height: 100%;
    margin: 40px auto 30px;
  }
  width: 100%;
`;

export default function FreeLectureInfo({ lid, classData, classtype }) {
  return (
    <LectureInfoContainer>
      <ClassImage1>
        <img
          src={`/free/${lid}/1.png`}
          alt="레디테크 캠퍼스"
          style={{ width: "100%" }}
        />
      </ClassImage1>
      <ClassImage2>
        <img
          src={`/free/${lid}/2.png`}
          alt="레디테크 캠퍼스"
          style={{ width: "100%" }}
        />
      </ClassImage2>
      <ClassImage3>
        <img
          src={`/free/${lid}/3.png`}
          alt="레디테크 캠퍼스"
          style={{ width: "100%" }}
        />
      </ClassImage3>
    </LectureInfoContainer>
  );
}
