import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import Image from "next/image";

const SignInContainer = styled.div`
  margin: 15px auto;
  width: 1160px;
`;

const TitleContainer = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0px;
`;
const RegistLabel = styled.label`
  width: 100%;
  font-size: 12px;
`;
const RegistInput = styled.input`
  width: 100%;
  border: none;
  /* border-bottom: 1px solid #cbcaca; */
  height: 40px;
  outline: none;
  margin-bottom: 20px;
`;
const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const PriceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 5px;
`;
const SignInInput = styled.input`
  width: 20%;
  border: none;
  border-bottom: 1px solid #cbcaca;
  height: 40px;
  outline: none;
  margin-bottom: 40px;
  font-size: 14px;
`;

const SignInLabel = styled.label`
  width: 100%;
  font-size: 12px;
  font-weight: bold;
`;
const SignInButton1 = styled.button`
  width: 100%;
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 15px;
  font-size: 16px;
  background-color: #a603a6;
  color: white;
  border-radius: 5px;
  font-weight: bold;
`;
const SignInButton2 = styled.button`
  width: 100%;
  border: none;
  margin-bottom: 20px;
  padding: 15px;
  font-size: 16px;
  border-radius: 5px;
  font-weight: bold;
`;

const Divider = styled.div`
  border-bottom: 0.1rem solid #424242;
  margin: 0px 0px 30px;
  width: 100%;
`;

export default function MyPage() {
  const auth = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("구현예정");

  const executeSignIn = async (event) => {
    event.preventDefault();
    // console.log("로그인 실행");
    const result = await auth.signIn(username, password);
    // console.log("result", result);
    // if (result.success) {
    //   // router.push("/");
    //   alert(result.message);
    // } else {
    //   alert(result.message);
    // }
  };
  // console.log("auth", auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setUsername(auth.username);
      setEmail(auth.useremail);
    } else {
      router.push("/signin");
    }
  }, [auth]);

  return (
    <SignInContainer>
      <div>My Page</div>
      <TitleContainer>기본 정보</TitleContainer>
      <InputsContainer>
        {/* <LoginText>로그인</LoginText> */}
        <Divider />
        <SignInLabel>아이디</SignInLabel>
        <SignInInput
          type="text"
          // placeholder="이름"
          disabled
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <SignInLabel>이메일</SignInLabel>
        <SignInInput
          type="text"
          // placeholder="아이디"
          disabled
          value={email}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SignInLabel>휴대폰 번호</SignInLabel>
        <SignInInput
          type="text"
          disabled
          // placeholder="비밀번호"
          value={phoneNumber}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputsContainer>
      <TitleContainer>수강 신청 정보</TitleContainer>
      <InputsContainer>
        <Divider />

        <RegistLabel>강의명</RegistLabel>
        <RegistInput
          type="text"
          placeholder="심지나의 임상 합격 ALL PASS"
          disabled
        />
        <RegistLabel>기간</RegistLabel>
        <RegistInput type="text" placeholder="12개월" disabled />

        <RegistLabel>결제 금액</RegistLabel>
        <RegistInput type="text" placeholder="100,000원" disabled />

        <RegistLabel>결제 방법</RegistLabel>
        <RegistInput type="text" placeholder="무통장입금" disabled />
        <RegistLabel>결제 상태</RegistLabel>
        <RegistInput
          type="text"
          placeholder="입금 대기중: 우리은행 2222-2222-2222"
          disabled
        />

        <TitleContainer>문의 사항</TitleContainer>
        <Divider />

        <PriceContainer>
          <div>결제, 환불, 서비스 이용 관련해서는 메일로 문의 주세요.</div>
          <div>kkhdevs@gmail.com</div>
          {/* <div
            style={{
              color: "red",
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            *유료서비스를 이용하지 않았을 경우 환불 가능합니다.
          </div> */}
        </PriceContainer>
      </InputsContainer>
    </SignInContainer>
  );
}
