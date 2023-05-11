import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

const LectureInfoContainer = styled.div``;

const ClassImage1 = styled.div`
  /* height: 250px; */
  width: 100%;
  height: 1178px;
  position: relative;
  > img {
    /* padding: 20px; */
  }
`;
const ClassImage2 = styled.div`
  /* height: 250px; */
  width: 100%;
  height: 917px;
  position: relative;
  /* > img {
    border-radius: 10px;
  } */
`;

export default function LectureInfo() {
  return (
    <LectureInfoContainer>
      <ClassImage1>
        <Image
          //   src={`/${lid}.jpeg`}
          src={`/info1.png`}
          alt="메인 배경 이미지"
          style={{ objectFit: "cover" }}
          fill
        />
      </ClassImage1>
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
