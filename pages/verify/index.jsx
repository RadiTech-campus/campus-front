import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

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
  margin: 438px 0px;
  padding: 0px 15px;
  background-color: white;
  color: #595959;
  font-size: 16px;
  font-weight: bold;
`;
const InfoText = styled.div`
  position: absolute;
  margin: 710px 0px;
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
const PeriodContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-top: 5px;
`;
const PeriodLabel = styled.label`
  width: 40%;
  margin: 3px 0px;
`;

const PriceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 5px;
`;

const PriceTitle = styled.div`
  font-size: 12px;
`;
const PriceDetail = styled.div`
  display: flex;
  font-size: 16px;
  /* margin: 5px; */
`;
const PriceContent = styled.div`
  margin: 5px;
  text-decoration: ${(props) => (props.canceled ? "line-through" : "")};
  font-weight: ${(props) => (props.finalPrice ? "bold" : "normal")};
  font-size: ${(props) => (props.finalPrice ? "18px" : "16px")};
  color: ${(props) => (props.finalPrice ? "red" : "")};
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

const periods = [1, 3, 6, 9, 12];
export default function SignUp() {
  const auth = useAuth();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    code: "",
    userName: "",
    phoneNumber: "",
  });

  const {
    userId,
    password,
    confirmPassword,
    email,
    code,
    userName,
    phoneNumber,
  } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...inputs,
      [name]: value,
    };

    setInputs(nextInputs);
  };

  const onReset = () => {
    setInputs({
      userId: "",
      password: "",
      confirmPassword: "",
      email: "",
      code: "",
      userName: "",
      phoneNumber: "",
    });
  };

  const [checked, setChecked] = useState(12);
  const handleChecked = (e) => {
    setChecked(Number(e.target.value));
  };

  return (
    <SignUpContainer>
      <TitleContainer>주문 확인하기</TitleContainer>
      <RegistBox>
        {/* <form noValidate> */}
        <InputsContainer>
          <ClassText>주문확인</ClassText>
          <Divider />

          <RegistLabel>강의명</RegistLabel>
          <RegistInput
            type="text"
            placeholder="심지나의 임상 합격 ALL PASS"
            disabled
            value={confirmPassword}
          />
          <RegistLabel>기간</RegistLabel>
          <RegistInput
            type="text"
            placeholder="12개월"
            disabled
            value={confirmPassword}
          />

          <RegistLabel>결제 금액</RegistLabel>
          <RegistInput
            type="text"
            placeholder="100,000원"
            disabled
            value={confirmPassword}
          />

          <RegistLabel>결제 방법</RegistLabel>
          <RegistInput
            type="text"
            placeholder="무통장입금"
            disabled
            value={confirmPassword}
          />
          <RegistLabel>결제 상태</RegistLabel>
          <RegistInput
            type="text"
            placeholder="입금 대기중: 우리은행 2222-2222-2222"
            disabled
            value={confirmPassword}
          />

          <UserText>구매자 정보</UserText>
          <Divider />
          <RegistLabel>이름</RegistLabel>
          <RegistInput
            type="text"
            placeholder="심지나"
            disabled
            value={confirmPassword}
          />

          <RegistLabel>메일</RegistLabel>
          <RegistInput
            type="email"
            placeholder="eoeornfl1@jinhak.com"
            disabled
            value={email}
          />

          <RegistLabel>휴대번호</RegistLabel>
          <RegistInput
            type="email"
            placeholder="010-4763-4695"
            disabled
            value={email}
          />

          <InfoText>문의 사항</InfoText>
          <Divider />

          <PriceContainer>
            <div>결제, 환불, 서비스 이용 관련해서는 메일로 문의 주세요.</div>
            <div>kkhdevs@gmail.com</div>
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
              // color: "red",
              fontSize: "14px",
              fontWeight: "bold",
              // marginTop: "20px",
            }}
          >
            <RegistButton onClick={() => router.push("/")}>HOME</RegistButton>
            <RegistButton onClick={() => router.push("/mypage")}>
              My Page
            </RegistButton>
          </div>
        </InputsContainer>
        {/* </form> */}
      </RegistBox>
    </SignUpContainer>
  );
}
