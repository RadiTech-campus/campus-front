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
  const isMobile = useIsMobile();

  return (
    <IndexContainer>
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
          "--swiper-pagination-bullet-size": "12px",
          "--swiper-pagination-bullet-horizontal-gap": "10px",
        }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {isMobile ? (
          <>
            <SwiperSlide>
              <img
                src={"4.png"}
                alt="레디테크 캠퍼스"
                style={{
                  width: "100%",
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={"33.png"}
                alt="레디테크 캠퍼스"
                style={{
                  width: "100%",
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={"777.png"}
                alt="레디테크 캠퍼스"
                style={{
                  width: "100%",
                }}
              />
            </SwiperSlide>
          </>
        ) : (
          <>
            <SwiperSlide
              style={{
                width: "1160px",
                height: "450px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={"a.png"}
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
                src={"b.png"}
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
                src={"c.png"}
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
                src={"d.png"}
                alt="레디테크 캠퍼스"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          </>
        )}
      </Swiper>
      {isMobile && (
        <>
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
          <LectureListBox
            category="자체 제작"
            mainTitle="레디테크 모의고사 무료 제공중 ✨"
            classData={data
              ?.filter(
                (li) => li.firstCat === "미니모의고사" && li.pay === "무료",
              )
              .sort((a, b) => (a.code > b.code ? 1 : -1))}
          />
          <img src="/pass.jpg" alt="line" style={{ width: "100%" }} />
          <LectureList4Box
            category="BIG5 대학병원 핵심 분석"
            mainTitle="대학병원 핵심 정보 분석 🥇"
            classData={data
              ?.filter((li) => li.firstCat === "병원" && li.pay === "유료")
              .sort((a, b) => (a.code > b.code ? 1 : -1))}
          />
        </>
      )}

      {!isMobile && (
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
      )}
    </IndexContainer>
  );
}
