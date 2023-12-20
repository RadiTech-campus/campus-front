import { Fragment, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import Image from "next/image";
import { useGetPayment } from "../../../query/contents";
import { AddDays, getDateDiff } from "../../../libs/date";
import { canclePayment } from "../../../api/contents_api";

const SignInContainer = styled.div`
  margin: 15px auto;
  width: 1160px;
  @media (max-width: 650px) {
    width: 90%;
  }
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
  height: 40px;
  outline: none;
  padding-left: 10px;
  ::placeholder {
    color: ${(props) => (props.finished ? "#E96962" : "#898989")};
    font-weight: ${(props) => (props.finished ? "700" : "#898989")};
    font-size: ${(props) => (props.finished ? "16px" : "")};
  }
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
  @media (max-width: 650px) {
    width: 50%;
  }
  width: 100%;
  border: none;
  height: 40px;
  outline: none;
  padding-left: 10px;
  ::placeholder {
    color: ${(props) => (props.finished ? "#E96962" : "#898989")};
    font-weight: ${(props) => (props.finished ? "700" : "#898989")};
    font-size: ${(props) => (props.finished ? "16px" : "")};
  }
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
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const { data: paymentData } = useGetPayment(username);
  const data = useMemo(
    () =>
      paymentData?.Items?.sort(
        (a, b) => new Date(b.applyDate) - new Date(a.applyDate),
      ) || [],
    [username, paymentData],
  );

  useEffect(() => {
    if (auth.isAuthenticated) {
      setUsername(auth.username);
      setUserName(auth.userName);
      setEmail(auth.useremail);
      setPhoneNumber(auth.userPhone);
    } else {
      router.push("/signin");
    }
  }, [auth]);

  const cancelPay = async (paymentId) => {
    if (confirm("수강신청을 취소 하시겠습니까?")) {
      try {
        canclePayment({ id: paymentId });
        alert("수강취소 되었습니다.");
      } catch (e) {
        alert("수강취소 오류가 발생했습니다. 관리자에게 문의해주세요.");
      }
    }
  };

  return (
    <SignInContainer>
      <TitleContainer>교제 배송지 입력</TitleContainer>
      <InputsContainer>
        <Divider />
        <RegistLabel>지역주소</RegistLabel>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
            backgroundColor: "#eeeeee",
          }}
        >
          <RegistInput type="text" disabled />
        </div>
        <RegistLabel>상세 주소</RegistLabel>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
            backgroundColor: "#eeeeee",
          }}
        >
          <RegistInput type="text" disabled />
        </div>

        <RegistLabel>받는사람</RegistLabel>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
            backgroundColor: "#eeeeee",
          }}
        >
          <RegistInput type="text" disabled finished />
        </div>
        <RegistLabel>연락처</RegistLabel>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
            backgroundColor: "#eeeeee",
          }}
        >
          <RegistInput type="text" disabled finished />
        </div>
      </InputsContainer>
    </SignInContainer>
  );
}
