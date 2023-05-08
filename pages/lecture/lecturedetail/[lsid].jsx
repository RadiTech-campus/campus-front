import React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const LectureDetailContainer = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px; */
  display: flex;
  margin: 0px auto;
  width: 100%;
  background-color: aqua;
`;

const SidebarContainer = styled.div`
  width: 20%;
  background-color: brown;
`;
const ContentContainer = styled.div`
  width: 80%;
  background-color: red;
`;

const Divider = styled.div`
  border-bottom: 0.1rem solid #e6e8eb;
  margin: 20px 0px;
`;

export default function LectureDetail() {
  const router = useRouter();
  const { lsid } = router.query;

  return (
    <LectureDetailContainer>
      <SidebarContainer>hi</SidebarContainer>
      <ContentContainer>hihihi</ContentContainer>
      <Divider />
    </LectureDetailContainer>
  );
}
