import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import Lectures from "../../components/lectures";
import {
  useGetContentDetails,
  useGetContents,
  useGetPayment,
} from "../../query/contents";
import Lecturer from "../../components/lecturer";
import LectureInfo from "../../components/lectureinfo";
import LectureWarn from "../../components/lecturewarn";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../../components/modal/Modal";

const LectureDetailContainer = styled.div`
  margin: 0px auto;
  width: 1160px;
`;
const Divider = styled.div`
  border-bottom: 0.1rem solid #e6e8eb;
  margin: 20px 0px;
`;

const TopDetail = styled.div`
  display: flex;
  flex: 1;
`;

const TopLeftDetail = styled.div`
  flex: 0.45;
  padding: 40px;
`;

const ClassImage = styled.div`
  height: 250px;
  position: relative;
  /* > img {
    border-radius: 10px;
  } */
`;
const TopRightDetail = styled.div`
  flex: 0.55;
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ClassMainTitle = styled.div`
  font-size: 16px;
`;
const ClassSubTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ClassPriceContainer = styled.div`
  display: flex;
  align-items: end;
  margin: 10px 0px 5px 0px;
`;

const ClassPriceLeft = styled.div`
  font-size: 22px;
  font-weight: bold;
`;
const ClassPriceRight = styled.div`
  font-size: 18px;
`;
const ClassPriceInfo = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ClassButtonContainer = styled.div`
  display: flex;
`;

const ClassButton = styled.button`
  width: 100%;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: ${(props) => props.colorCode};
  /* background-color: #7100a6; */
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const ClassTapContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gray;
  margin: 20px 0px;
`;
const ClassTap = styled.div`
  padding: 5px 30px;
  margin: 0px 50px;
  font-size: 20px;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  border-bottom: ${(props) => (props.selected ? "2px" : "0px")} solid black;
  cursor: pointer;
`;

const ClassContent = styled.div`
  display: flex;
  margin-top: 5px;
`;
const ClassLeftContent = styled.div`
  font-size: 14px;
  font-weight: bold;
  width: 100px;
`;
const ClassRightContent = styled.div`
  font-size: 14px;
`;

const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;
const ModalContent = styled.div`
  font-size: 15px;
  text-align: center;
  margin-bottom: 10px;
`;
const DetailBanner = styled.div`
  /* height: 250px; */
  width: 95%;
  height: 100px;
  position: relative;
  margin: auto;
  > img {
  }
`;
const tabs = ["강의소개", "커리큘럼", "강사소개", "주의사항"];

export default function Lecture() {
  const router = useRouter();
  const auth = useAuth();
  const { lid, classtype, title } = router.query;
  const [selectedTab, setSelectedTab] = useState("강의소개");
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    auth.isAuthenticated ? router.push("/regist") : setIsOpen(true);
  };
  const { data: contentDetailData } = useGetContentDetails(lid);
  const data = useMemo(
    () => contentDetailData?.Items || [],
    [contentDetailData, lid],
  );
  //
  const { data: contentData } = useGetContents();
  const data2 = useMemo(() => contentData?.Items || [], [contentData]);
  const preview = useRef(); //특정 DOM을 가리킬 때 사용하는 Hook함수, SecondDiv에 적용
  const onMoveToForm = () => {
    setSelectedTab("강의소개");
    setTimeout(() => {
      preview.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  const { data: paymentData } = useGetPayment(auth.username);
  const data3 = useMemo(() => paymentData?.Items || 0, [paymentData]);
  console.log("data3", data3);
  return (
    <LectureDetailContainer>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            router.push(`/signin?returnpath=${router.asPath}`);
          }}
        >
          <>
            <ModalTitle>
              {selectedTab === "커리큘럼" ? "커리큘럼" : "수강 신청"}
            </ModalTitle>
            <ModalContent>{"로그인이 필요한 서비스 입니다."}</ModalContent>
          </>
        </Modal>
      )}
      <TopDetail>
        <TopLeftDetail>
          <ClassImage>
            <Image
              src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${lid}${
                classtype === "기출" ? "_G" : ""
              }.jpeg`}
              alt="메인 배경 이미지"
              style={{ objectFit: "cover" }}
              fill
            />
          </ClassImage>
        </TopLeftDetail>
        <TopRightDetail>
          <div>
            {/* <ClassMainTitle>
              {lid?.slice(-1) === "F" && "#무료공개"} {`#${classtype}`}{" "}
              {`#${title}`}
            </ClassMainTitle> */}
            <ClassMainTitle>
              {data2.find((li) => li.code === data[0]?.contentCode)?.subTitle}
            </ClassMainTitle>
            <ClassSubTitle>
              {classtype === "기출"
                ? data2.find((li) => li.code === data[0]?.contentCode)?.gTitle
                : title}
            </ClassSubTitle>

            <ClassPriceContainer>
              <ClassPriceLeft>월 8,250원 / 1년 99,000원</ClassPriceLeft>
              {/* <ClassPriceRight>(ALLPASS 기준)</ClassPriceRight> */}
            </ClassPriceContainer>
            <ClassPriceInfo>강연 + 기출 + 자료 무제한으로 수강</ClassPriceInfo>
            <ClassContent>
              <ClassLeftContent>강의 분량</ClassLeftContent>
              <ClassRightContent>{data?.length} 개</ClassRightContent>
            </ClassContent>
            <ClassContent>
              <ClassLeftContent>강의 시간</ClassLeftContent>
              <ClassRightContent>4시간 +</ClassRightContent>
            </ClassContent>
          </div>
          <ClassButtonContainer>
            <ClassButton colorCode="#000000" onClick={() => onMoveToForm()}>
              미리보기
            </ClassButton>
            {data3 &&
            data3.length > 0 &&
            data3.filter(
              (li) =>
                (li.status === "결제완료" &&
                  li?.productCode?.includes("A_A01")) ||
                (li.status === "결제완료" &&
                  li?.productCode?.includes(lid?.substring(0, 5))),
            ).length > 0 ? (
              <ClassButton
                colorCode="#7100a6"
                onClick={() => setSelectedTab("커리큘럼")}
              >
                강의보기
              </ClassButton>
            ) : (
              <ClassButton
                colorCode="#7100a6"
                onClick={() => handleOpenModal()}
              >
                수강신청
              </ClassButton>
            )}
          </ClassButtonContainer>
        </TopRightDetail>
      </TopDetail>
      <DetailBanner>
        <Image
          src={`/detailbanner.png`}
          alt="메인 배경 이미지"
          style={{ objectFit: "cover" }}
          fill
        />
      </DetailBanner>

      <ClassTapContainer>
        {tabs.map((tab, i) => (
          <ClassTap
            key={i}
            id={tab}
            onClick={(e) => setSelectedTab(e.target.id)}
            selected={tab === selectedTab ? true : false}
          >
            {tab}
          </ClassTap>
        ))}
      </ClassTapContainer>
      {selectedTab === "강의소개" && (
        <LectureInfo
          lid={lid}
          classtype={classtype}
          classData={data2}
          preview={preview}
        />
      )}
      {selectedTab === "커리큘럼" && (
        <Lectures classData={data} classtype={classtype} title={title} />
      )}
      {selectedTab === "강사소개" && <Lecturer />}
      {selectedTab === "주의사항" && <LectureWarn />}
    </LectureDetailContainer>
  );
}
