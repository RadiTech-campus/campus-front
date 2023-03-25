import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin: 0px auto;
  width: 1160px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InfoContainer = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const AuthContainer = styled.div`
  font-size: 13px;
  display: flex;
`;
export default function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Image
          src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb0gIl9%2FbtqIRObxP4N%2FFNVnXFNEjttEnlXesSGe90%2Fimg.png"
          alt="메인 배경 이미지"
          width={30}
          height={30}
          style={{ borderRadius: "50%", marginRight: "5px" }}
        />
        <InfoContainer> RadiTech-campus</InfoContainer>
      </LogoContainer>
      {/* <AuthContainer>
        <div style={{ marginRight: "10px" }}>로그인</div>
        <div>회원가입</div>
      </AuthContainer> */}

      <AuthContainer>
        <div style={{ marginRight: "10px" }}>안녕하세요 아현님</div>
        <div style={{ marginRight: "10px" }}>마이페이지</div>
        <div>로그아웃</div>
      </AuthContainer>
    </HeaderContainer>
  );
}
