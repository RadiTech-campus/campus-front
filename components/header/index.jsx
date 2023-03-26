import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

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

const AuthContainer = styled.div`
  font-size: 13px;
  display: flex;
`;

const AuthButton = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;
export default function Header() {
  const router = useRouter();
  const auth = useAuth();
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
        </LogoContainer>
        <AuthContainer>
          <AuthButton onClick={() => router.push("/signin")}>로그인</AuthButton>
          <AuthButton onClick={() => router.push("/signup")}>
            회원가입
          </AuthButton>
        </AuthContainer>

        <AuthContainer>
          <AuthButton onClick={() => router.push("/mypage")}>
            안녕하세요 아현님
          </AuthButton>
          <AuthButton onClick={() => router.push("/mypage")}>
            마이페이지
          </AuthButton>
          <AuthButton onClick={() => auth.signOut()}>로그아웃</AuthButton>
        </AuthContainer>
      </HeaderContainer>
      <BorderLine />
    </>
  );
}
