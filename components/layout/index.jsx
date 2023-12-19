import styled from "@emotion/styled";
import React, { useRef } from "react";
import Header from "../header";
import Footer from "../footer";
import { useRouter } from "next/router";
import FooterMobile from "../footer_mobile";
import BottomNav from "../bottom_nav";
import HeaderMobile from "../header_mobile";
import GNB from "../gnb";

const LayoutContainer = styled.div`
  @media (max-width: 650px) {
    width: 100%;
    margin: 0 auto;
  }
`;

export default function Layout({ children }) {
  const footerRef = useRef(); //특정 DOM을 가리킬 때 사용하는 Hook함수, SecondDiv에 적용
  const onMoveToForm = () => {
    footerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const router = useRouter();
  const { route } = router;
  const routes = ["/signin", "/signup", "/forgotpassword", "/regist"];
  return (
    <LayoutContainer>
      <Header onMoveToForm={onMoveToForm} />
      {/* <GNB /> */}
      <HeaderMobile />
      {children}
      {routes.includes(route) ? "" : <Footer footerRef={footerRef} />}
      <FooterMobile footerRef={footerRef} />
      <BottomNav />
    </LayoutContainer>
  );
}
