import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../modal/Modal";
import { useRouter } from "next/router";
import { useGetPayment } from "../../query/contents";
import { upWatchedPayment } from "../../api/contents_api";
import { useGetLectureAuthByUserIdAndLectureId } from "../../query/new/queries";

const LecturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 650px) {
    padding: 20px;
    display: block;
  }
`;

const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const ChapterContainer = styled.div`
  display: flex;
  padding: 15px;
  border: 1px solid #bec1c6;
  color: #0b0d0f;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px 5px;
  border-radius: 5px;
  width: 60%;
  font-size: 22px;
  @media (max-width: 650px) {
    display: flex;
    padding: 10px;
    border: 1px solid #bec1c6;
    color: #0b0d0f;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px 15px;
    border-radius: 10px;
    width: auto;
  }
`;
const ChapterTitle = styled.div`
  width: 70%;
  @media (max-width: 650px) {
    width: 60%;
    font-size: 14px;
  }
`;

const ChapterButtonContainer = styled.div`
  width: 40%;
  font-size: 14px;
  display: flex;
  justify-content: center;
  @media (max-width: 650px) {
    width: 40%;
    font-size: 14px;
    justify-content: end;
  }
`;

const ChapterButton = styled.button`
  background-color: transparent;
  border: 1px solid #bec1c6;
  padding: 7px 30px;
  text-decoration: none;
  color: #bec1c6;
  margin-left: 5px;
  > a {
    text-decoration: none;
    color: #bec1c6;
  }
  @media (max-width: 650px) {
    background-color: transparent;
    border: 1px solid #bec1c6;
    padding: 2px 7px;
    text-decoration: none;
    color: #bec1c6;
    margin-left: 10px;
    > a {
      text-decoration: none;
      color: #bec1c6;
    }
  }
`;

export default function LecturesMobile({
  lectureDetailsData,
  aLectureData,
  setSelectedLectureDetail,
  onMoveToForm,
}) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { lid } = router.query;

  const { data: paymentData } = useGetLectureAuthByUserIdAndLectureId(
    auth.username,
    lid,
  );
  const payment = useMemo(() => paymentData || false, [paymentData]);
  return (
    <LecturesContainer>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            router.push(`/regist`);
          }}
        >
          <>
            <ModalTitle>수강신청이 필요한 서비스 입니다.</ModalTitle>
          </>
        </Modal>
      )}
      {aLectureData?.cnoteURL && (
        <ChapterContainer>
          <ChapterTitle># 요약</ChapterTitle>

          {aLectureData?.cnoteURL && (
            <ChapterButton
              onClick={() => {
                if (payment) {
                  window.open(aLectureData?.cnoteURL, "_blank");
                } else {
                  setIsOpen(true);
                }
              }}
            >
              이론
            </ChapterButton>
          )}
        </ChapterContainer>
      )}
      {aLectureData?.vnoteURL && (
        <ChapterContainer>
          <ChapterTitle># 요약</ChapterTitle>

          {aLectureData?.vnoteURL && (
            <ChapterButton
              onClick={() => {
                if (payment) {
                  window.open(aLectureData?.vnoteURL, "_blank");
                } else {
                  setIsOpen(true);
                }
              }}
            >
              이론
            </ChapterButton>
          )}
        </ChapterContainer>
      )}
      {lectureDetailsData.length > 0
        ? lectureDetailsData.map((li, i) => (
            <ChapterContainer key={i}>
              <ChapterTitle># {li.lectureDetailTitle}</ChapterTitle>
              <ChapterButtonContainer>
                {li?.noteURL && (
                  <ChapterButton
                    onClick={() => {
                      if (payment) {
                        window.open(li.noteURL, "_blank");
                      } else {
                        setIsOpen(true);
                      }
                    }}
                  >
                    자료
                  </ChapterButton>
                )}

                <ChapterButton
                  onClick={() => {
                    if (payment) {
                      onMoveToForm();
                      setSelectedLectureDetail(li.videoURL);
                    } else {
                      setIsOpen(true);
                    }
                  }}
                >
                  해설
                </ChapterButton>
              </ChapterButtonContainer>
            </ChapterContainer>
          ))
        : "강의가 준비중 입니다"}
    </LecturesContainer>
  );
}
