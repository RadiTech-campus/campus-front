import styled from "@emotion/styled";
import React from "react";

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0px auto 60px;
  width: 100%;
  border-top: 1px solid lightgray;
  @media (max-width: 620px) {
    /* width: 620px; */
    width: 100%;
    margin: 0 auto;
  }
`;
const Divider = styled.div`
  border-bottom: 0.1rem solid #e6e8eb;
  margin: 20px 0px;
  /* width: 2000px; */
  @media (max-width: 620px) {
    margin: 0px;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  width: 1160px;
  @media (max-width: 620px) {
    /* width: 620px; */
    width: 100%;
    margin: 0 auto;
  }
`;

const LeftContainer = styled.div`
  width: 33%;
  @media (max-width: 620px) {
    padding: 20px;
  }
`;
const CenterContainer = styled.div`
  width: 33%;
  @media (max-width: 620px) {
    padding: 20px;
  }
`;
const RightContainer = styled.div`
  width: 33%;
  @media (max-width: 620px) {
    padding: 20px;
  }
`;

const FooterTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const FooterContent = styled.div`
  font-size: 12px;
  margin-bottom: 3px;
`;

export default function Footer({ footerRef }) {
  return (
    <FooterContainer ref={footerRef}>
      <Divider />
      <BottomContainer>
        <LeftContainer>
          <FooterTitle>RadiTech-campus</FooterTitle>
          <FooterContent>㈜하이웨이​</FooterContent>
          <FooterContent>대표 : 이광자​​</FooterContent>
          <FooterContent>사업자번호 : 731-90-01929</FooterContent>
          <FooterContent>주소 :서울특별시 강서구 허준로 139</FooterContent>
          <FooterContent>
            통신판매업 신고번호 : 2023-서울강서-1834​
          </FooterContent>
          <FooterContent>
            고객센터 이메일: raditech.campus@gmail.com ​
          </FooterContent>
        </LeftContainer>
        <CenterContainer>
          <FooterTitle>LEGAL</FooterTitle>
          <FooterContent>취소 및 환불 정책 : </FooterContent>
          <FooterContent>유료 결제하여도 강연 및 강연 자료 등</FooterContent>
          <FooterContent>
            유료 서비스를 이용하지 않았다면 환불 가능합니다.
          </FooterContent>
        </CenterContainer>
        <RightContainer>
          <FooterContent>RadiTech-campus</FooterContent>
        </RightContainer>
      </BottomContainer>
    </FooterContainer>
  );
}
