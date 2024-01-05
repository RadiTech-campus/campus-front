import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import LectureList from "../components/lecturelist";
import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useGetContents, useGetPayment } from "../query/contents";
import { useAuth } from "../hooks/useAuth";
import { getDateDiff } from "../libs/date";
import { canclePayment } from "../api/contents_api";
import { useIsMobile } from "../hooks/useIsMobile";
import LectureListBox from "../components/lecturelist_box";
import LectureList4Box from "../components/lecturelist_4box";
import LectureListMobile from "../components/lecturelist_mobile";
import { useGetLecturesByContentId } from "../query/new/queries";
import Link from "next/link";

const IndexContainer = styled.div``;

export default function Index() {
  const auth = useAuth();
  const { data: contentData } = useGetContents();
  const data = useMemo(() => contentData?.Items || [], [contentData]);

  const periodData = useMemo(
    () =>
      contentData?.Items?.filter(
        (li) => li.pay === "기간" && new Date() < new Date(li.startDate),
      ).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) || [],
    [contentData],
  );

  const nonPeriodData = useMemo(
    () =>
      contentData?.Items?.filter(
        (li) => li.pay === "기간" && new Date() > new Date(li.startDate),
      ).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) || [],
    [contentData],
  );

  const { data: paymentData } = useGetPayment(auth.username);
  const data2 = useMemo(
    () =>
      paymentData?.Items?.filter(
        (li) =>
          getDateDiff(
            new Date().toISOString().substring(0, 10),
            new Date(li.applyDate).toISOString().substring(0, 10),
          ) > 7 && li.payStatus === "입금대기",
      ) || [],
    [paymentData],
  );

  useEffect(() => {
    if (data2.length > 0) {
      for (let i = 0; i < data2.length; i++) {
        canclePayment({ id: data2[i].id });
      }
    }
  }, [data2]);

  // 이하 개편 영역
  const isMobile = useIsMobile();

  const { data: lecturesData } = useGetLecturesByContentId(11);
  const lectureData = useMemo(() => lecturesData || [], [lecturesData]);

  const { data: freeLecturesData } = useGetLecturesByContentId(12);
  const freeLectureData = useMemo(
    () => freeLecturesData || [],
    [freeLecturesData],
  );

  const { data: hosData } = useGetLecturesByContentId(5);
  const hospitalData = useMemo(() => hosData || [], [hosData]);

  return (
    <IndexContainer>
      {isMobile && (
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            EffectFade,
            Autoplay,
          ]}
          // spaceBetween={50}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect={"fade"}
          style={{
            "--swiper-pagination-color": "#0422627d",
            "--swiper-pagination-bullet-inactive-color": "#9999998d",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "8px",
            "--swiper-pagination-bullet-horizontal-gap": "5px",
            paddingBottom: "30px",
          }}
        >
          {/* <SwiperSlide>
            <img
              src={"/mainbanner/mobile/1.png"}
              alt="레디테크 캠퍼스"
              style={{
                width: "100%",
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={"/mainbanner/mobile/2.png"}
              alt="레디테크 캠퍼스"
              style={{
                width: "100%",
              }}
            />
          </SwiperSlide> */}
          <SwiperSlide>
            <Link href={{ pathname: `/events` }}>
              <img
                src={"/mainbanner/mobile/3.png"}
                alt="레디테크 캠퍼스"
                style={{
                  width: "100%",
                }}
              />
            </Link>
          </SwiperSlide>
        </Swiper>
      )}

      {!isMobile && (
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            EffectFade,
            Autoplay,
          ]}
          // spaceBetween={50}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect={"fade"}
          style={{
            "--swiper-pagination-color": "#0422627d",
            "--swiper-pagination-bullet-inactive-color": "#9999998d",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "15px",
            "--swiper-pagination-bullet-horizontal-gap": "5px",
            paddingBottom: "40px",
            marginTop: "100px",
          }}
        >
          <SwiperSlide
            style={{
              width: "1160px",
              height: "450px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src={"/mainbanner/pc/001.png"}
              alt="레디테크 캠퍼스"
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: "450px",
              width: "1160px",
            }}
          >
            <Image
              src={"/mainbanner/pc/002.png"}
              alt="레디테크 캠퍼스"
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{
              height: "450px",
              width: "1160px",
            }}
          >
            <Link
              href={{
                pathname: "/events",
              }}
            >
              <Image
                src={"/mainbanner/pc/003.png"}
                alt="레디테크 캠퍼스"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </Link>
          </SwiperSlide>
        </Swiper>
      )}
      <LectureListMobile
        mainTitle="big5 취업트레이닝 ✍️"
        classData={lectureData}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isMobile ? (
          <img
            src="/mainbanner/mobile/main1.png"
            alt="line"
            style={{ width: "100%" }}
          />
        ) : (
          <></>
          // <img src="/jobbanner.png" alt="line" style={{ width: "1160px" }} />
        )}
      </div>

      <LectureList4Box
        category="BIG5 대학병원 핵심 분석"
        mainTitle="대학병원 핵심 정보 분석 🥇"
        classData={hospitalData}
      />
      <LectureListMobile
        mainTitle="무료 요약 자료 및 해설 강의 ✍️"
        classData={freeLectureData}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isMobile ? (
          <img
            src="/mainbanner/mobile/main2.png"
            alt="line"
            style={{ width: "100%" }}
          />
        ) : (
          <></>
          // <img src="/pass.png" alt="line" style={{ width: "1160px" }} />
        )}
      </div>
      <LectureListBox mainTitle="레디테크 모의고사 무료 제공중 ✨" />
      {/* </>
      )} */}

      {/* {!isMobile && (
        <>
          <LectureList
            category="자체 제작"
            mainTitle="레디테크 모의고사 무료 제공중 ✨"
            classData={data
              ?.filter(
                (li) => li.firstCat === "미니모의고사" && li.pay === "무료",
              )
              .sort((a, b) => (a.code > b.code ? 1 : -1))}
          />
          <LectureList
            category="무료 특강"
            mainTitle="3개년 기출 풀이"
            classData={[...periodData, ...nonPeriodData]}
          />
          <LectureList
            category="기간 한정 이벤트"
            mainTitle="무료 요약 자료 및 해설 강의 ✍️"
            classData={data
              ?.filter((li) => li.pay === "무료" && li.firstCat === "일반강의")
              .sort((a, b) => (a.code > b.code ? 1 : -1))}
          />
          <LectureList
            category="방사선사 국가고시"
            mainTitle="촉박한 시간, 방대한 시험범위, 한번에 해결!"
            classData={data
              ?.filter((li) => li.firstCat === "일반강의" && li.pay === "유료")
              .sort((a, b) => (a.code > b.code ? 1 : -1))}
          />
          <LectureList
            category="Big5 자소서 및 면접"
            mainTitle="Big5 취업까지 한번에 합격하기"
            classData={data
              ?.filter((li) => li.firstCat === "취업" && li.pay === "유료")
              .sort((a, b) => (a.code > b.code ? 1 : -1))}
          />
          <LectureList
            category="BIG5 대학병원 핵심 분석"
            mainTitle="대학병원 핵심 정보 분석 🥇"
            classData={data
              ?.filter((li) => li.firstCat === "병원" && li.pay === "유료")
              .sort((a, b) => (a.code > b.code ? 1 : -1))}
          />
        </>
      )} */}
    </IndexContainer>
  );
}
