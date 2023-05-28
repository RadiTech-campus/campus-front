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
import { useMemo, useState } from "react";
import { useGetContents } from "../query/contents";

const IndexContainer = styled.div``;
// const SwiperPagiContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 5px;
// `;

export default function Index() {
  const { data: contentData } = useGetContents();
  const data = useMemo(() => contentData?.Items || [], [contentData]);
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

        // pagination={{
        //   el: ".swiper-custom-pagination",
        //   clickable: true,
        // }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide
          style={{
            width: "1160px",
            height: "450px",
            backgroundColor: "#030712",
          }}
        >
          <Image
            src="/1.png"
            alt="메인 배경 이미지"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide
          style={{
            width: "1160px",
            height: "450px",
            backgroundColor: "#000F2A",
          }}
        >
          <Image
            src="/2.png"
            alt="메인 배경 이미지"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide>
        {/* <SwiperSlide style={{ width: "100%", height: "450px" }}>
          <Image
            src="/2.png"
            alt="메인 배경 이미지"
            style={{ objectFit: "fill" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "450px" }}>
          <Image
            src="/3.png"
            alt="메인 배경 이미지"
            style={{ objectFit: "fill" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "450px" }}>
          <Image
            src="/4.png"
            alt="메인 배경 이미지"
            style={{ objectFit: "fill" }}
            fill
          />
        </SwiperSlide> */}
        {/* <SwiperSlide style={{ width: "100%", height: "450px" }}>
          <Image
            src="/swi.png"
            alt="메인 배경 이미지"
            style={{ objectFit: "fill" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "350px" }}>
          <Image
            src="/swi2.png"
            alt="메인 배경 이미지"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "350px" }}>
          <Image
            src="/swi3.png"
            alt="메인 배경 이미지"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "350px" }}>
          <Image
            src="/swi.png"
            alt="메인 배경 이미지"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide> */}
        {/* <SwiperSlide style={{ width: "100%", height: "350px" }}>
          <Image
            src="/swi.png"
            alt="메인 배경 이미지"
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
        category="방사선사 국가고시"
        mainTitle="어려운 임상도 한번에 합격하기"
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
    </IndexContainer>
  );
}
