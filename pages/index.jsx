import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import LectureList from "../components/lecturelist";
import styled from "@emotion/styled";
import Image from "next/image";

const IndexContainer = styled.div``;

export default function Index() {
  const data = [
    {
      thumbnail:
        "https://cdn.news.unn.net/news/photo/202301/540181_346310_728.jpg",
      title: "심혈관 중재술",
      content: "강의 내용 요약",
    },
    {
      thumbnail:
        "https://image.newsis.com/2011/01/13/NISI20110113_0003923500_web.jpg",
      title: "투시",
      content: "강의 내용 요약",
    },
    {
      thumbnail:
        "http://www.dailydgnews.com/data/photos/20211146/art_16371432800126_dc33b6.jpg",
      title: "초음파",
      content: "강의 내용 요약",
    },
    {
      thumbnail:
        "http://www.dailydgnews.com/data/photos/20211146/art_16371432800126_dc33b6.jpg",
      title: "초음파",
      content: "강의 내용 요약",
    },
  ];
  return (
    <IndexContainer>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide
          style={{ width: "100%", backgroundColor: "red", height: "350px" }}
        >
          <Image
            src="https://cdn.news.unn.net/news/photo/202301/540181_346310_728.jpg"
            alt="메인 배경 이미지"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide
          style={{ width: "100%", backgroundColor: "blue", height: "350px" }}
        >
          <Image
            src="https://cdn.news.unn.net/news/photo/202301/540181_346310_728.jpg"
            alt="메인 배경 이미지"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide>
        <SwiperSlide
          style={{ width: "100%", backgroundColor: "green", height: "350px" }}
        >
          <Image
            src="https://cdn.news.unn.net/news/photo/202301/540181_346310_728.jpg"
            alt="메인 배경 이미지"
            style={{ objectFit: "contain" }}
            fill
          />
        </SwiperSlide>
      </Swiper>
      <LectureList
        category="Free"
        mainTitle="*아현*님을 위한 Course"
        description="국시 합격과 취업을 심지나쌤이 응원하겠습니다!"
        classData={data}
      />
      <LectureList
        category="Best Seller"
        mainTitle="실기 ALL Course"
        description="어려운 실기를 가장 효과적으로 공부하기 !"
        classData={data}
      />
    </IndexContainer>
  );
}
