import styled from "@emotion/styled";
import React from "react";

const WarnContainer = styled.div`
  padding: 10px 40px;
  margin-bottom: 50px;
  @media (max-width: 650px) {
    padding: 10px 15px;
  }
`;
const WarnTitle = styled.button`
  font-size: 22px;
  font-weight: bold;
  margin: 20px 0px 10px;
  @media (max-width: 650px) {
    font-size: 3.5vw;
    background-color: #e96962;
    color: white;
    text-align: center;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 20px;
    border: none;
  }
`;
const WarnContent = styled.div`
  font-size: 18px;
  padding: 5px 0px;
  @media (max-width: 650px) {
    font-size: 14px;
  }
`;

export default function LectureWarn() {
  return (
    <WarnContainer>
      {/* <InfoTitle>주의사항</InfoTitle> */}
      <WarnTitle>환불 규정 안내</WarnTitle>
      <WarnContent>
        유료 결제하여도 강연 및 강연 자료 등 유료 서비스를 이용하지 않았다면
        환불 가능합니다.
      </WarnContent>
      <WarnContent>
        단, 1회라도 유료 서비스를 이용했을 경우 환불은 불가합니다.
      </WarnContent>

      <WarnContent>
        구매일로부터 90일까지 환불 신청이 가능합니다. 결제 취소 요청은 아래
        이메일로 요청 부탁드립니다.
      </WarnContent>
      <WarnContent>고객센터 : raditech.campus@gmail.com</WarnContent>

      <WarnTitle>아이디 공유 금지 정책</WarnTitle>

      <WarnContent>
        모든 온라인 강의에서는 1개의 아이디로 여러명이 공유하는 형태를 금지하고
        있습니다.
      </WarnContent>
      <WarnContent>
        동시접속에 대한 기록은 내부 시스템을 통해 자동으로 누적되며, 이후 서비스
        이용이 제한될 수 있습니다.
      </WarnContent>
      <WarnTitle>저작권 정책</WarnTitle>
      <WarnContent>
        모든 강의는 무단 배포 및 가공하는 행위, 캡쳐 및 녹화하여 공유하는 행위,
        무단으로 판매하는 행위 등
      </WarnContent>
      <WarnContent>
        일체의 저작권 침해 행위를 금지합니다. 부정 사용이 적발될 경우 저작권법
        위반에 의한 법적인 제재를 받으실 수 있습니다.
      </WarnContent>
    </WarnContainer>
  );
}
