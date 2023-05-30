import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../modal/Modal";
import { useRouter } from "next/router";

const LecturesContainer = styled.div`
  padding: 10px 40px;
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
export default function Lectures({ classData, classtype, title }) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <LecturesContainer>
      {/* <InfoTitle>강의 목록</InfoTitle> */}
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
            ?.filter((li) => li.contentDetailSubTitle === classtype)
            .sort((a, b) => (a.sorting > b.sorting ? 1 : -1))
            .map((li, i) => (
              <div
                key={i}
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
                {`# ${i + 1}. ${li.contentDetailTitle}`}
                {auth.isAuthenticated ? (
                  <div>
                    <Link
                      href={{
                        pathname: `https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/content-data/${li.contentDetailCode}.pdf`,
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
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
                        강의자료
                      </button>
                    </Link>
                    <Link
                      href={{
                        pathname: `/lecture/lecturedetail/${li.contentCode}`,
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
                  </div>
                ) : (
                  <div>
                    {/* <Link
                      href={{
                        pathname: `https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/content-data/${li.contentDetailCode}.pdf`,
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    > */}
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
                      onClick={() => setIsOpen(true)}
                    >
                      강의자료
                    </button>
                    {/* </Link> */}
                    {/* <Link
                      href={{
                        pathname: `/lecture/lecturedetail/${li.contentCode}`,
                        query: {
                          detailCode: li.contentDetailCode,
                          classtype,
                          title,
                        },
                      }}
                    > */}
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
                      onClick={() => setIsOpen(true)}
                    >
                      강의보기
                    </button>
                    {/* </Link> */}
                  </div>
                )}
              </div>
            ))}
        </LectureChapter>
      ) : (
        "강의가 준비중 입니다"
      )}
    </LecturesContainer>
  );
}
