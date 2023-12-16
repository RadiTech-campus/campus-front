import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import LectureDetail from "../../components/lecturedetail";
import FreeLectureDetail from "../../components/lecturedetail/freeLectureDetail";
import PeriodLectureDetail from "../../components/lecturedetail/periodLectureDetail";
import MoLectureDetail from "../../components/lecturedetail/moLectureDetail";
import styled from "@emotion/styled";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useAuth } from "../../hooks/useAuth";
import LectureInfoMobile from "../../components/lectureinfo_mobile";
import {
  useGetLectureAuthByUserIdAndLectureId,
  useGetLectureById,
  useGetLectureDetailByLecturetId,
} from "../../query/new/queries";
import { getLectureById } from "../../api/new_apis";
import LecturesMobile from "../../components/lectures_mobile";
import Lecturer from "../../components/lecturer";
import LectureWarn from "../../components/lecturewarn";

const LectureDetailContainer = styled.div`
  margin: 0px auto;
  width: 1160px;
  @media (max-width: 650px) {
    width: 100%;
  }
`;

const TopDetail = styled.div`
  display: flex;
  flex: 1;
  @media (max-width: 650px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const ClassMainTitle = styled.div`
  font-size: 16px;
  @media (max-width: 650px) {
    font-size: 4.5vw;
    color: #0b0d0f;
    font-weight: 700;
  }
`;
const ClassSubTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;
  @media (max-width: 650px) {
    font-size: 4.2vw;
    color: #818181;
    font-weight: 500;
    margin-top: 5px;
  }
`;

const ClassTapContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #a2a2a2;
  margin: 20px 0px;
  @media (max-width: 650px) {
    /* padding: 10px 20px; */
    margin: 0px 0px;
    padding: 0 10px;
    color: #666666;
  }
`;
const ClassTap = styled.div`
  @media (max-width: 650px) {
    padding: 10px 10px;
    margin: 0px 0px;
    font-size: 14px;
  }
  padding: 5px 30px;
  margin: 0px 50px;
  font-size: 20px;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  border-bottom: ${(props) => (props.selected ? "3px" : "0px")} solid #e96962;
  cursor: pointer;
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
  const isMobile = useIsMobile();

  const { lid } = router.query;
  const [selectedTab, setSelectedTab] = useState("강의소개");

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    auth.isAuthenticated ? router.push("/regist") : setIsOpen(true);
  };
  // const { data: contentDetailData } = useGetContentDetails(lid);
  // const data = useMemo(
  //   () => contentDetailData?.Items || [],
  //   [contentDetailData, lid],
  // );
  //
  // const { data: contentData } = useGetContents();
  // const data2 = useMemo(() => contentData?.Items || [], [contentData]);
  const preview = useRef(); //특정 DOM을 가리킬 때 사용하는 Hook함수, SecondDiv에 적용
  const onMoveToForm = () => {
    // setSelectedTab("강의소개");
    setTimeout(() => {
      preview.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };
  // const { data: lectureDetailData } = useGetLectureDetailByLecturetId(lid);
  const { data: lectureDetailData } = useGetLectureDetailByLecturetId(lid);
  const lectureDetailsData = useMemo(
    () => lectureDetailData || [],
    [lectureDetailData],
  );

  const { data: lectureData } = useGetLectureById(lid);
  const aLectureData = useMemo(() => lectureData || null, [lectureData]);

  const [selectedLectureDetail, setSelectedLectureDetail] = useState();

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
          <ModalTitle>
            {selectedTab === "커리큘럼" ? "커리큘럼" : "수강 신청"}
          </ModalTitle>
          <ModalContent>{"로그인이 필요한 서비스 입니다."}</ModalContent>
        </Modal>
      )}
      {selectedLectureDetail ? (
        <div ref={preview}>
          <iframe
            src={`https://player.vimeo.com/video/${selectedLectureDetail}`}
            width="100%"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      ) : (
        <img
          src={`/lecturebanner/lecture.png`}
          alt="레디테크 캠퍼스"
          style={{ width: "100%" }}
        />
      )}

      <TopDetail>
        <ClassMainTitle>{aLectureData?.lectureTitle}</ClassMainTitle>
        <ClassSubTitle>{aLectureData?.description}</ClassSubTitle>
      </TopDetail>
      <img
        src={`/pass.jpg`}
        alt="레디테크 캠퍼스"
        style={{
          width: "100%",
        }}
      />

      <ClassTapContainer>
        {tabs.map((tab, i) => (
          <ClassTap
            key={i}
            id={tab}
            onClick={(e) => {
              setSelectedLectureDetail();
              setSelectedTab(e.target.id);
            }}
            selected={tab === selectedTab ? true : false}
          >
            {tab}
          </ClassTap>
        ))}
      </ClassTapContainer>
      {selectedTab === "강의소개" && (
        <LectureInfoMobile aLectureData={aLectureData} />
      )}
      {selectedTab === "커리큘럼" && (
        <LecturesMobile
          lectureDetailsData={lectureDetailsData}
          setSelectedLectureDetail={setSelectedLectureDetail}
          onMoveToForm={onMoveToForm}
        />
      )}
      {selectedTab === "강사소개" && <Lecturer />}
      {selectedTab === "주의사항" && <LectureWarn />}
    </LectureDetailContainer>
  );
}
