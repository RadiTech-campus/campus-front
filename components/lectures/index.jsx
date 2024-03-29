import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../modal/Modal";
import { useRouter } from "next/router";
import { useGetPayment } from "../../query/contents";
import { upWatchedPayment } from "../../api/contents_api";

const LecturesContainer = styled.div`
  padding: 10px 10px;
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

export default function Lectures({ classData, classtype, title }) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isPayed, setIsPayed] = useState(false);
  const router = useRouter();
  const { lid } = router.query;

  const { data: paymentData, isLoading } = useGetPayment(auth.username);
  const data2 = useMemo(() => paymentData?.Items || [], [paymentData, auth]);
  useEffect(() => {
    if (!isLoading) {
      if (
        data2.filter(
          (li) =>
            (li.payStatus === "결제완료" &&
              li?.productCode?.includes("A_A01")) ||
            (li.payStatus === "결제완료" &&
              li?.productCode?.includes(lid?.substring(0, 5))),
        ).length > 0
      ) {
        setIsPayed(true);
      }
    }
  }, [auth, data2]);

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
          {classtype === "강의" &&
          lid?.substring(2, 3) !== "C" &&
          lid?.substring(2, 3) !== "H" &&
          isPayed ? (
            <>
              <PreviewContainer>
                <div>
                  {lid.includes("C_B06") ? "# 물리 요약본" : "# 강의 요약본"}{" "}
                </div>
                <div>
                  <Link
                    href={{
                      pathname: `https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/content-summary/${lid.substring(
                        0,
                        5,
                      )}_C.pdf`,
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
                      onClick={() => {
                        upWatchedPayment({
                          id: data2.filter(
                            (li) =>
                              (li?.payStatus === "결제완료" &&
                                li?.productCode?.includes("A_A01")) ||
                              (li?.payStatus === "결제완료" &&
                                li?.productCode?.includes(
                                  lid?.substring(0, 5),
                                )),
                          )[0]?.id,
                          watched: Number(
                            data2.filter(
                              (li) =>
                                (li?.payStatus === "결제완료" &&
                                  li?.productCode?.includes("A_A01")) ||
                                (li?.payStatus === "결제완료" &&
                                  li?.productCode?.includes(
                                    lid?.substring(0, 5),
                                  )),
                            )[0]?.watched + 1,
                          ),
                        });
                      }}
                    >
                      강의요약
                    </button>
                    {/* ㅇㄹ아ㅣ너 */}
                  </Link>
                </div>
              </PreviewContainer>
              <PreviewContainer>
                <div>
                  {lid.includes("C_B05") ? "# 임상 요약본" : "# 영상 요약본"}{" "}
                </div>
                <div>
                  <Link
                    href={{
                      pathname: `https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/content-summary/${lid.substring(
                        0,
                        5,
                      )}_V.pdf`,
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
                      onClick={() => {
                        upWatchedPayment({
                          id: data2.filter(
                            (li) =>
                              (li?.payStatus === "결제완료" &&
                                li?.productCode?.includes("A_A01")) ||
                              (li?.payStatus === "결제완료" &&
                                li?.productCode?.includes(
                                  lid?.substring(0, 5),
                                )),
                          )[0]?.id,
                          watched: Number(
                            data2.filter(
                              (li) =>
                                (li?.payStatus === "결제완료" &&
                                  li?.productCode?.includes("A_A01")) ||
                                (li?.payStatus === "결제완료" &&
                                  li?.productCode?.includes(
                                    lid?.substring(0, 5),
                                  )),
                            )[0]?.watched + 1,
                          ),
                        });
                      }}
                    >
                      영상요약
                    </button>
                  </Link>
                </div>
              </PreviewContainer>
            </>
          ) : (classtype === "강의" && lid?.substring(2, 3) === "C") ||
            (classtype === "강의" && lid?.substring(2, 3) === "H") ||
            (classtype !== "강의" && isPayed) ? (
            ""
          ) : (
            <>
              <PreviewContainer>
                <div>
                  {lid.includes("C_B06") ? "# 물리 요약본" : "# 강의 요약본"}{" "}
                </div>
                <div>
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
                    onClick={() => {
                      alert("수강신청이 필요한 과목 입니다.");
                      router.push("/regist");
                    }}
                  >
                    강의요약
                  </button>
                </div>
              </PreviewContainer>
              <PreviewContainer>
                <div>
                  {lid.includes("C_B05") ? "# 임상 요약본" : "# 영상 요약본"}{" "}
                </div>
                <div>
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
                    onClick={() => {
                      alert("수강신청이 필요한 과목 입니다.");
                      router.push("/regist");
                    }}
                  >
                    영상요약
                  </button>
                </div>
              </PreviewContainer>
            </>
          )}

          {classData
            ?.filter((li) => li.contentDetailSubTitle === classtype)
            .sort((a, b) => (a.sorting > b.sorting ? 1 : -1))
            .map((li, i) => (
              <ChapterContainer key={i} style={{}}>
                <ChapterTitle>{`# ${i + 1}. ${
                  li.contentDetailTitle
                }`}</ChapterTitle>

                {auth.isAuthenticated && isPayed ? (
                  <ChapterButtonContainer>
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
                        onClick={() => {
                          upWatchedPayment({
                            id: data2.filter(
                              (li) =>
                                (li?.payStatus === "결제완료" &&
                                  li?.productCode?.includes("A_A01")) ||
                                (li?.payStatus === "결제완료" &&
                                  li?.productCode?.includes(
                                    lid?.substring(0, 5),
                                  )),
                            )[0]?.id,
                            watched: Number(
                              data2.filter(
                                (li) =>
                                  (li?.payStatus === "결제완료" &&
                                    li?.productCode?.includes("A_A01")) ||
                                  (li?.payStatus === "결제완료" &&
                                    li?.productCode?.includes(
                                      lid?.substring(0, 5),
                                    )),
                              )[0]?.watched + 1,
                            ),
                          });
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
                        onClick={() => {
                          upWatchedPayment({
                            id: data2.filter(
                              (li) =>
                                (li?.payStatus === "결제완료" &&
                                  li?.productCode?.includes("A_A01")) ||
                                (li?.payStatus === "결제완료" &&
                                  li?.productCode?.includes(
                                    lid?.substring(0, 5),
                                  )),
                            )[0]?.id,
                            watched: Number(
                              data2.filter(
                                (li) =>
                                  (li?.payStatus === "결제완료" &&
                                    li?.productCode?.includes("A_A01")) ||
                                  (li?.payStatus === "결제완료" &&
                                    li?.productCode?.includes(
                                      lid?.substring(0, 5),
                                    )),
                              )[0]?.watched + 1,
                            ),
                          });
                        }}
                      >
                        강의보기
                      </button>
                    </Link>
                  </ChapterButtonContainer>
                ) : auth.isAuthenticated && !isPayed ? (
                  <ChapterButtonContainer>
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
                      onClick={() => {
                        alert("수강신청이 필요한 과목 입니다.");
                        router.push("/regist");
                      }}
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
                      onClick={() => {
                        alert("수강신청이 필요한 과목 입니다.");
                        router.push("/regist");
                      }}
                    >
                      강의보기
                    </button>
                    {/* </Link> */}
                  </ChapterButtonContainer>
                ) : (
                  <ChapterButtonContainer>
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
                  </ChapterButtonContainer>
                )}
              </ChapterContainer>
            ))}
        </LectureChapter>
      ) : (
        "강의가 준비중 입니다"
      )}
    </LecturesContainer>
  );
}
