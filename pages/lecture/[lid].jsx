import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import Lectures from "../../components/lectures";
import { useGetContentDetails, useGetContents } from "../../query/contents";
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

const ClassButton = styled.button`
  width: 100%;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #7100a6;
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
  console.log(
    "data2",
    data2.find((li) => li.code === data[0]?.contentCode)?.subTitle,
  );
  console.log("data", data[0]?.contentCode);
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
            <ModalTitle>수강 신청</ModalTitle>
            <ModalContent>{"로그인이 필요한 서비스 입니다."}</ModalContent>
          </>
        </Modal>
      )}
      <TopDetail>
        <TopLeftDetail>
          <ClassImage>
            <Image
              src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${lid}.jpeg`}
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
            <ClassSubTitle>{`${title}`}</ClassSubTitle>

            <ClassPriceContainer>
              <ClassPriceLeft>월 20,000원 / 6개월 120,000원</ClassPriceLeft>
              <ClassPriceRight>(ALLPASS 기준)</ClassPriceRight>
            </ClassPriceContainer>
            <ClassPriceInfo>
              모든 강연 + 기출 + 강연자료 모두 무제한으로 수강
            </ClassPriceInfo>
            <ClassContent>
              <ClassLeftContent>강의 분량</ClassLeftContent>
              <ClassRightContent>{data?.length} 개</ClassRightContent>
            </ClassContent>
            <ClassContent>
              <ClassLeftContent>강의 시간</ClassLeftContent>
              <ClassRightContent>4시간 +</ClassRightContent>
            </ClassContent>
          </div>
          <ClassButton onClick={() => handleOpenModal()}>수강신청</ClassButton>
        </TopRightDetail>
      </TopDetail>
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
      {selectedTab === "강의소개" && <LectureInfo />}
      {selectedTab === "커리큘럼" && (
        <Lectures classData={data} classtype={classtype} title={title} />
      )}
      {selectedTab === "강사소개" && <Lecturer />}
      {selectedTab === "주의사항" && <LectureWarn />}
    </LectureDetailContainer>
  );
}
