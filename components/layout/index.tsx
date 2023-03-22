import styled from "@emotion/styled";
import React from "react";

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

export default function Layout({ children }: any) {
  return (
    <LayoutContainer>
      {/* <LeftContainer></LeftContainer> */}
      {/* <RightContainer></RightContainer> */}

      {children}
    </LayoutContainer>
  );
}
