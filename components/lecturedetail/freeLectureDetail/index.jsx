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

const LectureDetailContainer = styled.div`
  margin: 0px auto;
  width: 1160px;
  @media (max-width: 620px) {
    width: 100%;
  }
`;

const TopDetail = styled.div`
  display: flex;
  flex: 1;
  @media (max-width: 620px) {
    flex-direction: column;
  }
`;

const TopLeftDetail = styled.div`
  flex: 0.45;
  padding: 20px;
  @media (max-width: 620px) {
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
  @media (max-width: 620px) {
    height: 180px;
  }
`;
const TopRightDetail = styled.div`
  flex: 0.55;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 620px) {
    /* padding: 0px; */
    /* margin: 15px; */
  }
`;

const ClassSubTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;
  @media (max-width: 620px) {
    font-size: 20px;
  }
`;

const ClassPriceContainer = styled.div`
  display: flex;
  align-items: end;
  margin: 10px 0px 5px 0px;
`;

const ClassPriceInner = styled.div`
  @media (max-width: 620px) {
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
  @media (max-width: 620px) {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const ClassButtonContainer = styled.div`
  display: flex;

  justify-content: center;
  @media (max-width: 620px) {
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
  @media (max-width: 620px) {
    /* margin: 0px;
    padding: 0px; */
  }
`;

const ClassTapContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gray;
  margin: 20px 0px;
  @media (max-width: 620px) {
    /* padding: 10px 20px; */
    margin: 0px 0px;
  }
`;
const ClassTap = styled.div`
  @media (max-width: 620px) {
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
  @media (max-width: 620px) {
    height: 50px;
    display: none;
  }
  height: 100px;
  position: relative;
  margin: auto;
  > img {
  }
`;
const tabs = ["요약자료", "무료인강"];

export default function FreeLectureDetail() {
  const router = useRouter();
  const auth = useAuth();
  const isMobile = useIsMobile();

  const { lid, classtype } = router.query;
  const [selectedTab, setSelectedTab] = useState("요약자료");
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

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated) {
        setIsOpen(true);
      }
    }
  }, [auth]);

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
              colorCode="#000000"
              onClick={() =>
                auth.isAuthenticated
                  ? setSelectedTab("요약자료")
                  : setIsOpen(true)
              }
            >
              요약자료
            </ClassButton>
            <ClassButton
              colorCode="#7100a6"
              onClick={() =>
                auth.isAuthenticated
                  ? setSelectedTab("무료인강")
                  : setIsOpen(true)
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
      {selectedTab === "요약자료" && (
        <FreeLectureInfo lid={lid} classtype={classtype} classData={data2} />
      )}
      {selectedTab === "무료인강" && (
        <FreeLectures classData={data} classtype={classtype} title={title} />
      )}
    </LectureDetailContainer>
  );
}
