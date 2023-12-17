import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useGetLatestPayment } from "../../query/new/queries";

const ClassText = styled.div`
  position: absolute;
  margin: 11px 0px;
  padding: 0px 15px;
  background-color: white;
  color: #595959;
  font-size: 16px;
  font-weight: bold;
`;
const UserText = styled.div`
  position: absolute;
  margin: 360px 0px;
  padding: 0px 15px;
  background-color: white;
  color: #595959;
  font-size: 16px;
  font-weight: bold;
`;
const InfoText = styled.div`
  position: absolute;
  margin: 634px 0px;
  padding: 0px 15px;
  background-color: white;
  color: #595959;
  font-size: 16px;
  font-weight: bold;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const RegistBox = styled.div`
  width: 360px;
  margin: 0px auto;
  border: 0.1rem solid #e6e8eb;
  border-radius: 5px;
  padding: 20px 40px;
`;

const TitleContainer = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0px;
  width: 440px;
  margin: 0px auto;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PriceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 5px;
`;

const RegistInput = styled.input`
  width: 100%;
  border: none;
  /* border-bottom: 1px solid #cbcaca; */
  height: 40px;
  outline: none;
  margin-bottom: 20px;
`;
const RegistSelect = styled.select`
  width: 100%;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #cbcaca;
  height: 40px;
  outline: none;
  margin-bottom: 20px;
`;

const RegistLabel = styled.label`
  width: 100%;
  font-size: 12px;
`;

const RegistButton = styled.button`
  width: 100%;
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
  margin: 10px 10px 20px;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  background-color: #a603a6;
  color: white;
  cursor: pointer;
`;

const Divider = styled.div`
  border-bottom: 0.1rem solid #e6e8eb;
  margin: 20px 0px;
  width: 100%;
`;

export default function Verify() {
  const auth = useAuth();

  const { data: latestPaymentData } = useGetLatestPayment(auth?.username);

  const router = useRouter();

  return (
    <SignUpContainer>
      <TitleContainer>주문 확인하기</TitleContainer>
      <RegistBox>
        <InputsContainer>
          <ClassText>주문확인</ClassText>
          <Divider />

          <RegistLabel>강의명</RegistLabel>
          <RegistInput
            type="text"
            placeholder={latestPaymentData?.productTitle}
            disabled
          />
          <RegistLabel>결제 금액</RegistLabel>
          <RegistInput
            type="text"
            placeholder={latestPaymentData?.price}
            disabled
          />

          <RegistLabel>결제 방법</RegistLabel>
          <RegistInput type="text" placeholder="무통장입금" disabled />
          <RegistLabel>결제 상태</RegistLabel>
          <RegistInput
            type="text"
            placeholder={latestPaymentData?.payStatus}
            disabled
          />

          <UserText>구매자 정보</UserText>
          <Divider />
          <RegistLabel>이름</RegistLabel>
          <RegistInput type="text" placeholder={auth.userName} disabled />

          <RegistLabel>메일</RegistLabel>
          <RegistInput type="email" placeholder={auth.useremail} disabled />

          <RegistLabel>휴대번호</RegistLabel>
          <RegistInput type="email" placeholder={auth.userPhone} disabled />

          <InfoText>문의 사항</InfoText>
          <Divider />

          <PriceContainer>
            <div>결제, 환불, 서비스 이용 관련해서는 메일로 문의 주세요.</div>
            <div>raditech.campus@gmail.com </div>
            <div
              style={{
                color: "red",
                fontSize: "14px",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              *유료서비스를 이용하지 않았을 경우 환불 가능합니다.
            </div>
          </PriceContainer>
          <div
            style={{
              width: "100%",
              display: "flex",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            <RegistButton onClick={() => router.push("/")}>HOME</RegistButton>
            <RegistButton onClick={() => router.push("/mypage")}>
              My Room
            </RegistButton>
          </div>
        </InputsContainer>
      </RegistBox>
    </SignUpContainer>
  );
}
