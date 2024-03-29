import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../hooks/useAuth";
import Modal from "../../modal/Modal";
import { useRouter } from "next/router";
import { useGetPayment } from "../../../query/contents";
import { upWatchedPayment } from "../../../api/contents_api";

const LecturesContainer = styled.div`
  padding: 10px 10px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const InfoTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0px;
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

const PreviewContainer = styled.div`
  padding: 15px 25px;
  font-size: 16px;
  border-top: 1px solid lightgray;
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 650px) {
    padding: 10px;
  }
`;

const ChapterContainer = styled.div`
  padding: 15px 25px;
  font-size: 16px;
  border-top: 1px solid lightgray;
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 650px) {
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
`;
const ChapterTitle = styled.div`
  @media (max-width: 650px) {
    width: 100%;
  }
`;
const ChapterButtonContainer = styled.div`
  @media (max-width: 650px) {
    width: 100%;
    display: flex;
    justify-content: end;
  }
`;

export default function PeriodLectures({ classData, classtype, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { lid } = router.query;

  return (
    <LecturesContainer>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            router.push(`/signin?returnpath=${router.asPath}`);
          }}
        >
          <>
            <ModalTitle>로그인이 필요한 서비스 입니다.</ModalTitle>
          </>
        </Modal>
      )}
      {classData && classData.length > 0 ? (
        <LectureChapter>
          {classData
            .sort((a, b) => (a.sorting > b.sorting ? 1 : -1))
            .map((li, i) => (
              <ChapterContainer key={i} style={{}}>
                <ChapterTitle>{`# ${i + 1}. ${
                  li.contentDetailTitle
                }`}</ChapterTitle>

                <ChapterButtonContainer>
                  <Link
                    href={{
                      pathname: `/lecture/periodlecturedetail/${li.contentCode}`,
                      query: {
                        detailCode: li.contentDetailCode,
                        classtype,
                        title,
                      },
                    }}
                  >
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
                  </Link>
                </ChapterButtonContainer>
              </ChapterContainer>
            ))}
        </LectureChapter>
      ) : (
        "강의가 준비중 입니다"
      )}
    </LecturesContainer>
  );
}
