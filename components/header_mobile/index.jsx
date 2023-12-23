import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

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
const AuthButton = styled.div`
  margin-right: 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  width: 15%;
`;

export default function HeaderMobile() {
  const router = useRouter();
  return (
    <HeaderContainer>
      <Link href={"/"}>
        <MobileLogo src="/titlelogo.png" alt="레디테크 캠퍼스" />
      </Link>
      <AuthButton
        // selected={router.pathname === "/mypage"}
        onClick={() => router.push("/event")}
      >
        이벤트
      </AuthButton>
    </HeaderContainer>
  );
}
