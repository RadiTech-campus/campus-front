import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

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
    display: block;
  }
`;

const MobileLogo = styled.img`
  @media (max-width: 650px) {
    width: 300px;
    padding: 0px 5px;
  }
`;

export default function HeaderMobile() {
  return (
    <HeaderContainer>
      <Link href={"/"}>
        <MobileLogo src="/titlelogo.png" alt="레디테크 캠퍼스" />
      </Link>
    </HeaderContainer>
  );
}
