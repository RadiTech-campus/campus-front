import styled from "@emotion/styled";
import React from "react";

const FooterContainer = styled.div`
  display: none;
  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    border-top: 1px #f2f3f5 solid;
    height: 200%;
    padding-top: 20px;
    margin-bottom: 107px;
  }
`;

const FooterContent = styled.div`
  font-size: 2vw;
  line-height: 24px;
  color: #666666;
`;

export default function FooterMobile({ footerRef }) {
  return (
    <FooterContainer ref={footerRef}>
      <FooterContent>
        레디테크캠퍼스 | 고객센터 이메일: raditech.campus@gmail.com
      </FooterContent>
      <FooterContent>
        ㈜하이웨이 사업자번호 : 731-90-01929, 통신판매업 신고번호 :
        2023-서울강서-1834​
      </FooterContent>
      <FooterContent>
        ​Copyright(c) raditech-campus Corp. All Rights Reserved.
      </FooterContent>
    </FooterContainer>
  );
}
