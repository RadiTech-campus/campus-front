import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import { useGetContentDetails, useGetContents } from "../../../query/contents";
import { useAuth } from "../../../hooks/useAuth";
import Modal from "../../modal/Modal";
import { useIsMobile } from "../../../hooks/useIsMobile";
import FreeLectureInfo from "../../lectureinfo/freeLectureInfo";
import FreeLectures from "../../lectures/freeLectures";
import useIsPeriod from "../../../hooks/useIsPeriod";
import PeriodLectures from "../../lectures/periodLectures";

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
  }
`;

const TopLeftDetail = styled.div`
  flex: 0.45;
  padding: 20px;
  @media (max-width: 650px) {
    height: 200px;
    padding: 10px;
  }
`;

const ClassImage = styled.div`
  height: 270px;
  position: relative;
  > img {
    border-radius: 10px;
  }
  @media (max-width: 650px) {
    height: 180px;
  }
`;
const TopRightDetail = styled.div`
  flex: 0.55;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 650px) {
    /* padding: 0px; */
    /* margin: 15px; */
  }
`;

const ClassSubTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;
  @media (max-width: 650px) {
    font-size: 20px;
  }
`;

const ClassPriceContainer = styled.div`
  display: flex;
  align-items: end;
  margin: 10px 0px 5px 0px;
`;

const ClassPriceInner = styled.div`
  @media (max-width: 650px) {
    font-size: 20px;
  }
  font-size: 24px;
  font-weight: 600;
  margin-left: 7px;
  margin-right: 3px;
`;
const ClassPriceOuter = styled.div`
  font-size: 18px;
`;

const ClassPriceInfo = styled.div`
  font-size: 18px;
  /* font-weight: bold; */
  margin-bottom: 15px;
  margin-top: 15px;
  color: #888888c1;
  @media (max-width: 650px) {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const ClassButtonContainer = styled.div`
  display: flex;

  justify-content: center;
  @media (max-width: 650px) {
    margin-top: 20px;
  }
`;

const ClassButton = styled.button`
  width: 100%;
  margin: 3px;
  padding: 10px 20px;
  background-color: ${(props) => props.colorCode};
  /* background-color: #7100a6; */
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  @media (max-width: 650px) {
    /* margin: 0px;
    padding: 0px; */
  }
`;

const ClassTapContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gray;
  margin: 20px 0px;
  @media (max-width: 650px) {
    /* padding: 10px 20px; */
    margin: 0px 0px;
  }
`;
const ClassTap = styled.div`
  @media (max-width: 650px) {
    padding: 10px 20px;
    margin: 0px 0px;
    font-size: 14px;
  }
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
  color: #888888c1;
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
  @media (max-width: 650px) {
    height: 50px;
    display: none;
  }
  height: 100px;
  position: relative;
  margin: auto;
  > img {
  }
`;
// const tabs = ["요약자료", "무료인강"];
const tabs = ["무료인강"];

export default function PeriodLectureDetail() {
  const router = useRouter();
  const auth = useAuth();
  const isMobile = useIsMobile();

  const { lid, classtype } = router.query;
  const [selectedTab, setSelectedTab] = useState("무료인강");
  const [isOpen, setIsOpen] = useState(false);

  const { data: contentDetailData } = useGetContentDetails(lid);

  const data = useMemo(
    () => contentDetailData?.Items || [],
    [contentDetailData, lid, auth],
  );

  const { data: contentData } = useGetContents();
  const data2 = useMemo(
    () => contentData?.Items || [],
    [contentData, lid, auth],
  );

  const { startDate, endDate } = useMemo(
    () =>
      data2.filter((li) => li.code === lid)[0] || {
        startDate: "",
        endDate: "",
      },
    [data2],
  );

  const { isPeriod } = useIsPeriod(startDate, endDate);
  const [isOpen2, setIsOpen2] = useState(false);

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated) {
        setIsOpen(true);
      } else {
        if (!isPeriod) {
          setIsOpen2(true);
        }
      }
    }
  }, [auth, isPeriod]);

  const [title, setTitle] = useState();
  useEffect(() => {
    setTitle(data2.filter((li) => li.code === lid)[0]?.secondCat);
  }, [data2]);
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
            <ModalTitle>무료 수강</ModalTitle>
            <ModalContent>{"로그인이 필요한 서비스 입니다."}</ModalContent>
          </>
        </Modal>
      )}
      {isOpen2 && (
        <Modal
          open={isOpen2}
          onClose={() => {
            setIsOpen2(false);
            router.push(`/`);
          }}
        >
          <>
            <ModalTitle>{"제공 기간이 아닙니다"}</ModalTitle>
          </>
        </Modal>
      )}
      <TopDetail>
        <TopLeftDetail>
          <ClassImage>
            {isMobile ? (
              <img
                src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${lid}${
                  classtype === "기출" ? "_G" : ""
                }.jpeg`}
                alt="레디테크 캠퍼스"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              <Image
                src={`https://radi-tech-static.s3.ap-northeast-2.amazonaws.com/contents/${lid}${
                  classtype === "기출" ? "_G" : ""
                }.jpeg`}
                alt="레디테크 캠퍼스"
                style={{ objectFit: "cover" }}
                fill
              />
            )}
          </ClassImage>
        </TopLeftDetail>
        <TopRightDetail>
          <div>
            <ClassSubTitle>
              {title?.split("!").map((li, i) => (
                <div key={i} style={{ marginBottom: "3px" }}>
                  {li}
                  {i === 0 ? "!" : ""}
                </div>
              ))}
            </ClassSubTitle>

            <ClassPriceContainer>
              <ClassPriceOuter></ClassPriceOuter>
              <ClassPriceInner>0 </ClassPriceInner>
              <ClassPriceOuter>원 (기간 한정 이벤트) </ClassPriceOuter>
            </ClassPriceContainer>
            <ClassPriceInfo>강연 + 자료 무제한으로 수강</ClassPriceInfo>
            <ClassContent>
              <ClassLeftContent>강의 분량</ClassLeftContent>
              <ClassRightContent>{data?.length} 개</ClassRightContent>
            </ClassContent>
            <ClassContent>
              <ClassLeftContent>강의 시간</ClassLeftContent>
              <ClassRightContent>25 분</ClassRightContent>
            </ClassContent>
          </div>
          <ClassButtonContainer>
            <ClassButton
              colorCode="#7100a6"
              onClick={() =>
                // auth.isAuthenticated
                //   ? setSelectedTab("무료인강")
                //   : setIsOpen(true)
                router.push(
                  `/lecture/periodlecturedetail/${data[0].contentCode}?detailCode=${data[0].contentDetailData}&classtype=강의&title=${title}`,
                )
              }
            >
              무료인강
            </ClassButton>
          </ClassButtonContainer>
        </TopRightDetail>
      </TopDetail>
      <DetailBanner>
        {isMobile ? (
          <img
            src={`/detailbanner.png`}
            alt="레디테크 캠퍼스"
            style={{
              width: "100%",
            }}
          />
        ) : (
          <Image
            src={`/detailbanner.png`}
            alt="레디테크 캠퍼스"
            style={{ objectFit: "cover" }}
            fill
          />
        )}
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
      {selectedTab === "무료인강" && (
        <PeriodLectures classData={data} classtype={classtype} title={title} />
      )}
    </LectureDetailContainer>
  );
}
