import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin: 0px auto;
  width: 1160px;
`;

const BorderLine = styled.div`
  border-bottom: 0.1rem solid #e6e8eb;
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
    <>
      <HeaderContainer>
        <LogoContainer>
          <Link href={"/"}>
            <Image
              src="/titlelogo.png"
              alt="메인 배경 이미지"
              width={160}
              height={30}
              style={{ marginRight: "5px" }}
            />
          </Link>
          {/* <InfoContainer> RadiTech-campus</InfoContainer> */}
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
      <BorderLine />
    </>
  );
}
