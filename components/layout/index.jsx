import styled from "@emotion/styled";
import React, { useRef } from "react";
import Header from "../header";
import TopNav from "../topnav";
import Footer from "../footer";
import { useRouter } from "next/router";

const LayoutContainer = styled.div`
  /* display: flex;
  flex: 1; */
`;

const LeftContainer = styled.div`
  /* flex: 0.15; */
`;

const RightContainer = styled.div`
  flex: 0.85;
  display: flex;
  flex-direction: column;
  background-color: #e7f1fb;
`;

export default function Layout({ children }) {
  const footerRef = useRef(); //특정 DOM을 가리킬 때 사용하는 Hook함수, SecondDiv에 적용
  const onMoveToForm = () => {
    footerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const router = useRouter();
  const { route } = router;
  console.log("router", router);
  const routes = ["/signin", "/signup", "/forgotpassword", "/regist"];
  return (
    <LayoutContainer>
      {/* <LeftContainer></LeftContainer> */}
      {/* <RightContainer></RightContainer> */}
      <Header onMoveToForm={onMoveToForm} />
      {/* <TopNav /> */}
      {children}
      {routes.includes(route) ? "" : <Footer footerRef={footerRef} />}
    </LayoutContainer>
  );
}
