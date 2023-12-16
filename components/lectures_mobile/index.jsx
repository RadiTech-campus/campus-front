import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../modal/Modal";
import { useRouter } from "next/router";
import { useGetPayment } from "../../query/contents";
import { upWatchedPayment } from "../../api/contents_api";

const LecturesContainer = styled.div`
  @media (max-width: 650px) {
    padding: 20px;
  }
`;

const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const ChapterContainer = styled.div`
  @media (max-width: 650px) {
    display: flex;
    padding: 10px;
    border: 1px solid #bec1c6;
    color: #0b0d0f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px 15px;
    border-radius: 10px;
  }
`;
const ChapterTitle = styled.div`
  @media (max-width: 650px) {
    width: 100%;
    font-size: 14px;
  }
`;
const ChapterButton = styled.button`
  @media (max-width: 650px) {
    width: 20%;
    background-color: transparent;
    border: 1px solid #bec1c6;
    padding: 7px 10px;
    text-decoration: none;
    color: #bec1c6;
  }
`;

export default function LecturesMobile({
  lectureDetailsData,
  setSelectedLectureDetail,
}) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isPayed, setIsPayed] = useState(false);
  const router = useRouter();
  const { lid } = router.query;

  // const { data: paymentData, isLoading } = useGetPayment(auth.username);
  // const data2 = useMemo(() => paymentData?.Items || [], [paymentData, auth]);
  // useEffect(() => {
  //   if (!isLoading) {
  //     if (
  //       data2.filter(
  //         (li) =>
  //           (li.payStatus === "결제완료" &&
  //             li?.productCode?.includes("A_A01")) ||
  //           (li.payStatus === "결제완료" &&
  //             li?.productCode?.includes(lid?.substring(0, 5))),
  //       ).length > 0
  //     ) {
  //       setIsPayed(true);
  //     }
  //   }
  // }, [auth, data2]);

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
      {lectureDetailsData.length > 0
        ? lectureDetailsData.map((li, i) => (
            <ChapterContainer
              key={i}
              onClick={() => setSelectedLectureDetail(li.videoURL)}
            >
              <ChapterTitle># {li.lectureDetailTitle}</ChapterTitle>
              <ChapterButton>해설</ChapterButton>
            </ChapterContainer>
          ))
        : "강의가 준비중 입니다"}
    </LecturesContainer>
  );
}
