import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ChevronUpIcon from "../icons/ChevronUpIcon";

const LecturesContainer = styled.div`
  padding: 10px 40px;
`;
const LectureChapter = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 0;
  justify-content: space-between;
  /* padding: 10px 10px; */
  border: 1px solid rgba(10, 10, 10, 0.1);
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.12);
  /* transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); */
  /* :hover {
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
  } */
`;

export default function Lectures({ chapter, hiddenAll }) {
  const [arrow, setArrow] = useState(true);
  const handleArrow = () => {
    setArrow(!arrow);
  };

  return (
    <LecturesContainer>
      <LectureChapter>
        <div
          style={{
            padding: "15px 25px",
            fontSize: "16px",
            borderTop: "1px solid lightgray",
            display: "flex",
            fontWeight: "bold",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          # 1. 초음파 1
          <button
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              backgroundColor: "#7100a6",
              color: "white",
              fontWeight: "bold",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            강의보기
          </button>
        </div>
        <div
          style={{
            padding: "15px 25px",
            fontSize: "16px",
            borderTop: "1px solid lightgray",
            display: "flex",
            fontWeight: "bold",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          # 1. 초음파 2
          <button
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              backgroundColor: "#7100a6",
              color: "white",
              fontWeight: "bold",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            강의보기
          </button>
        </div>
        <Link href={"/lecture/lecturedetail/12"}>
          <div
            style={{
              padding: "15px 25px",
              fontSize: "16px",
              borderTop: "1px solid lightgray",
              display: "flex",
              fontWeight: "bold",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            # 2. 초음파 3
            <button
              style={{
                marginRight: "10px",
                padding: "10px 20px",
                backgroundColor: "#7100a6",
                color: "white",
                fontWeight: "bold",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              강의보기
            </button>
          </div>
        </Link>
      </LectureChapter>
    </LecturesContainer>
  );
}
