import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

const HeaderContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  margin: 0px auto;
  width: 1160px;
  position: "sticky";
  top: 0;
  z-index: 10;
  background-color: "white";
  @media (max-width: 650px) {
    width: 100%;
    margin: 0 auto;
    padding: 0px;
    display: flex;
  }
`;

const MobileLogo = styled.img`
  @media (max-width: 650px) {
    width: 65%;
    padding: 0px 5px;
  }
`;
const AuthButton = styled.button`
  @media (max-width: 650px) {
    margin-right: 15px;
    font-size: 2.5vw;
    padding: 3px 6px;
    font-weight: 600;
    /* cursor: pointer; */
    border-radius: 20px;
    border: none;
    background-color: black;
    color: white;
    width: 25%;
  }
`;

export default function HeaderMobile() {
  const router = useRouter();
  const auth = useAuth();
  auth.isAuthenticated;
  console.log("router", router.pathname);
  return (
    <HeaderContainer>
      <Link href={"/"}>
        <MobileLogo src="/titlelogo.png" alt="레디테크 캠퍼스" />
      </Link>
      {/* {router.pathname === "/signin" ? (
        ""
      ) : (
        <AuthButton onClick={() => router.push("/signin")}>로그인</AuthButton>
      )} */}
      {!auth.isAuthenticated && router.pathname !== "/signin" && (
        <AuthButton
          onClick={() => {
            router.push("/signin");
          }}
        >
          로그인
        </AuthButton>
      )}
      {auth.isAuthenticated && (
        <AuthButton
          onClick={() => {
            auth.signOut();
            router.push("/");
          }}
        >
          로그아웃
        </AuthButton>
      )}
    </HeaderContainer>
  );
}
