import { Fragment, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import Image from "next/image";
import { useGetPayment } from "../../query/contents";

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
  const data = useMemo(() => paymentData?.Items || [], [username, paymentData]);
  console.log("data", data);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setUsername(auth.username);
      setEmail(auth.useremail);
      setPhoneNumber(auth.userPhone);
    } else {
      router.push("/signin");
    }
  }, [auth]);

  function AddDays(date, days) {
    // date는 문자열로 받는다 ex, '2020-10-15'
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const getDateDiff = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const diffDate = date1.getTime() - date2.getTime();

    return diffDate / (1000 * 60 * 60 * 24); // 밀리세컨 * 초 * 분 * 시 = 일
  };

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
          placeholder={username}
          disabled
          // value={username}
          // onChange={(e) => setUsername(e.target.value)}
        />
        <SignInLabel>이메일</SignInLabel>
        <SignInInput
          type="text"
          placeholder={email}
          disabled
          // value={email}
          // onChange={(e) => setPassword(e.target.value)}
        />
        <SignInLabel>휴대폰 번호</SignInLabel>
        <SignInInput
          type="text"
          disabled
          placeholder={phoneNumber}
          // value={phoneNumber}
          // onChange={(e) => setPassword(e.target.value)}
        />
      </InputsContainer>
      <TitleContainer>수강 신청 정보</TitleContainer>
      <InputsContainer>
        {data.map((li, i) => (
          <Fragment key={i}>
            <Divider />
            <RegistLabel>강의명</RegistLabel>
            <RegistInput type="text" placeholder={li.firstCat} disabled />
            <RegistLabel>기간</RegistLabel>
            <RegistInput type="text" placeholder={li.period} disabled />

            <RegistLabel>결제 금액</RegistLabel>
            <RegistInput type="text" placeholder={`${li.price} 원`} disabled />

            <RegistLabel>결제 방법</RegistLabel>
            <RegistInput type="text" placeholder="무통장입금" disabled />
            <RegistLabel>
              결제 상태{" "}
              {getDateDiff(
                new Date(li.date).toISOString().substring(0, 10),
                new Date().toISOString().substring(0, 10),
              ) < 0 ? (
                ""
              ) : (
                <span>
                  {AddDays(new Date(li.date).toISOString().substring(0, 10), 7)
                    .toISOString()
                    .substring(0, 10)}{" "}
                  까지 입금이 확인 되지 않는 경우 자동 취소됩니다.
                </span>
              )}
            </RegistLabel>
            <RegistInput
              type="text"
              placeholder={`${
                getDateDiff(
                  new Date(li.date).toISOString().substring(0, 10),
                  new Date().toISOString().substring(0, 10),
                ) < 0
                  ? "결제 취소"
                  : li.status
              }: 우리은행 예금주 이광자 124-233998-12-601 ​`}
              disabled
            />
            {console.log(
              getDateDiff(
                new Date(li.date).toISOString().substring(0, 10),
                new Date().toISOString().substring(0, 10),
              ),
              AddDays(new Date(li.date).toISOString().substring(0, 10), 7),
            )}
          </Fragment>
        ))}

        <TitleContainer>문의 사항</TitleContainer>
        <Divider />

        <PriceContainer>
          <div>결제, 환불, 서비스 이용 관련해서는 메일로 문의 주세요.</div>
          <div>raditech.campus@gmail.com </div>
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
