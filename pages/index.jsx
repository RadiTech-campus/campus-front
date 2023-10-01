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

const IndexContainer = styled.div``;
// const SwiperPagiContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 5px;
// `;

export default function Index() {
  const auth = useAuth();
  const { data: contentData } = useGetContents();
  const data = useMemo(() => contentData?.Items || [], [contentData]);

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
          <SwiperSlide>
            <img
              src={"1111.png"}
              alt="레디테크 캠퍼스"
              style={{
                width: "100%",
              }}
            />
          </SwiperSlide>
        ) : (
          <SwiperSlide
            style={{
              width: "1160px",
              height: "450px",
              backgroundColor: "#030712",
            }}
          >
            <Image
              src={"1.png"}
              alt="레디테크 캠퍼스"
              style={{ objectFit: "contain" }}
              fill
            />
          </SwiperSlide>
        )}

        {/* <SwiperSlide
          style={{
            width: "1160px",
            height: "450px",
            backgroundColor: "#000F2A",
          }}
        >
          <Image
            src="/2.png"
            alt="레디테크 캠퍼스"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide> */}
        {/* <SwiperSlide style={{ width: "100%", height: "450px" }}>
          <Image
            src="/2.png"
            alt="레디테크 캠퍼스"
            style={{ objectFit: "fill" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "450px" }}>
          <Image
            src="/3.png"
            alt="레디테크 캠퍼스"
            style={{ objectFit: "fill" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "450px" }}>
          <Image
            src="/4.png"
            alt="레디테크 캠퍼스"
            style={{ objectFit: "fill" }}
            fill
          />
        </SwiperSlide> */}
        {/* <SwiperSlide style={{ width: "100%", height: "450px" }}>
          <Image
            src="/swi.png"
            alt="레디테크 캠퍼스"
            style={{ objectFit: "fill" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "350px" }}>
          <Image
            src="/swi2.png"
            alt="레디테크 캠퍼스"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "350px" }}>
          <Image
            src="/swi3.png"
            alt="레디테크 캠퍼스"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "350px" }}>
          <Image
            src="/swi.png"
            alt="레디테크 캠퍼스"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide> */}
        {/* <SwiperSlide style={{ width: "100%", height: "350px" }}>
          <Image
            src="/swi.png"
            alt="레디테크 캠퍼스"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide> */}
      </Swiper>
      {/* <LectureList
        category="Free"
        mainTitle="무료 공개 강의"
        description="국시 합격과 취업을 심지나쌤이 응원하겠습니다!"
        classData={data
          ?.filter((li) => li.pay === "무료")
          .sort((a, b) => (a.code > b.code ? 1 : -1))}
      /> */}
      <LectureList
        category="기간 한정 이벤트"
        mainTitle="무료 인강 & 요약 자료"
        classData={data
          ?.filter((li) => li.pay === "무료")
          .sort((a, b) => (a.code > b.code ? 1 : -1))}
      />
      <LectureList
        category="방사선사 국가고시"
        mainTitle="촉박한 시간, 방대한 시험범위, 한번에 해결!"
        // description="어려운 실기를 가장 효과적으로 공부하기 !"
        classData={data
          ?.filter((li) => li.firstCat === "일반강의" && li.pay === "유료")
          .sort((a, b) => (a.code > b.code ? 1 : -1))}
      />
      <LectureList
        category="Big5 자소서 및 면접"
        mainTitle="Big5 취업까지 한번에 합격하기"
        // description="취업 가즈아 !"
        classData={data
          ?.filter((li) => li.firstCat === "취업" && li.pay === "유료")
          .sort((a, b) => (a.code > b.code ? 1 : -1))}
      />
      <LectureList
        category="BIG5 대학병원 핵심 분석"
        mainTitle="대학병원 핵심 정보 한번에 알아보기"
        // description="취업 가즈아 !"
        classData={data
          ?.filter((li) => li.firstCat === "병원" && li.pay === "유료")
          .sort((a, b) => (a.code > b.code ? 1 : -1))}
      />
    </IndexContainer>
  );
}
