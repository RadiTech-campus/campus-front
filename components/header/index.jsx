import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

const HeaderContainer = styled.div``;

const Topcontainer = styled.div`
  position: relative;
  height: 350px;
`;

const ImageContainer = styled.div`
  z-index: 0.9;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgb(101 100 100 / 34%),
    rgba(0, 0, 0, 0.87)
  );
`;

const TextContainer = styled.div`
  position: absolute;
  text-align: right;
  z-index: 1;
  top: 10px;
  right: -120px;
  transform: translate(-50%, 0);
  width: 300px;
  color: #fff;
  font-size: 40px;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 120px;
  left: 250px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 7px solid rgba(218, 218, 218, 0.5);
  height: 80px;
`;
const InfoName = styled.div`
  flex: none;
  font-weight: bold;
  font-size: 40px;
  margin-left: 550px;
`;
const InfoDate = styled.div`
  font-size: 30px;
  margin-right: 30px;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Topcontainer>
        <ImageContainer>
          <TextContainer>
            <h2>연세대학교</h2>
            <h3>방사선학과</h3>
          </TextContainer>
          <Image
            src="http://image.dongascience.com/Photo/2021/06/544eb03f7951f9d504e99665a4089e90.jpg"
            alt="메인 배경 이미지"
            fill
            style={{ objectFit: "cover", objectPosition: "20% 20%" }}
          />
        </ImageContainer>
      </Topcontainer>
      <LogoContainer>
        <Image
          src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb0gIl9%2FbtqIRObxP4N%2FFNVnXFNEjttEnlXesSGe90%2Fimg.png"
          alt="메인 배경 이미지"
          width={300}
          height={300}
          style={{ borderRadius: "50%" }}
        />
      </LogoContainer>
      <InfoContainer>
        <InfoName>이름</InfoName>
        <InfoDate>23회 시험일 : 2022-10-10</InfoDate>
      </InfoContainer>
    </HeaderContainer>
  );
}
