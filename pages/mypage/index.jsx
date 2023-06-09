import { Fragment, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import Image from "next/image";
import { useGetPayment } from "../../query/contents";
import { AddDays, getDateDiff } from "../../libs/date";
import { canclePayment } from "../../api/contents_api";

const SignInContainer = styled.div`
  margin: 15px auto;
  width: 1160px;
  @media (max-width: 620px) {
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
  margin-bottom: 20px;
  ::placeholder {
    color: ${(props) => (props.finished ? "#a603a6" : "#898989")};
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
  width: 20%;
  @media (max-width: 620px) {
    width: 50%;
  }
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
      <div>My Page</div>
      <TitleContainer>기본 정보</TitleContainer>
      <InputsContainer>
        {/* <LoginText>로그인</LoginText> */}
        <Divider />
        <SignInLabel>이름</SignInLabel>
        <SignInInput
          type="text"
          placeholder={userName}
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
        {data.length < 1 ? (
          <Fragment>
            <Divider />

            <RegistLabel>강의명</RegistLabel>
            <RegistInput
              type="text"
              placeholder="수강 이력이 없습니다"
              disabled
            />

            <RegistLabel>결제 방법</RegistLabel>
            <RegistInput type="text" placeholder="" disabled />
            <RegistLabel>결제 상태 </RegistLabel>

            <RegistInput type="text" placeholder="" disabled />
          </Fragment>
        ) : (
          data.map((li, i) => (
            <Fragment key={i}>
              <Divider />
              <div
                style={{
                  width: "100%",
                  // backgroundColor: "red",
                  // height: "200px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div></div>
                {li?.payStatus === "결제취소" ? (
                  ""
                ) : (li?.payStatus === "결제완료" && li?.watched === 0) ||
                  li?.payStatus === "입금대기" ? (
                  <div>
                    <button
                      style={{
                        width: "80px",
                        border: "none",
                        backgroundColor: "#c100d7",
                        color: "white",
                        padding: "5px 0px",
                        borderRadius: "5px",
                        fontWeight: "700",
                      }}
                      onClick={() => cancelPay(li.id)}
                    >
                      수강취소
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {/* {(li?.payStatus === "결제취소" ||
                  li?.payStatus === "결제완료") &&
                li?.watched === 0 ? (
                  ""
                ) : (
                  <div>
                    <button
                      style={{
                        width: "80px",
                        border: "none",
                        backgroundColor: "#c100d7",
                        color: "white",
                        padding: "5px 0px",
                        borderRadius: "5px",
                        fontWeight: "700",
                      }}
                      onClick={() => cancelPay(li.id)}
                    >
                      수강취소
                    </button>
                  </div>
                )} */}
              </div>
              <RegistLabel>강의명</RegistLabel>
              <RegistInput type="text" placeholder={li.productTitle} disabled />
              {/* <RegistLabel>기간</RegistLabel>
            <RegistInput type="text" placeholder={li.period} disabled /> */}
              <RegistLabel>결제 금액</RegistLabel>
              <RegistInput
                type="text"
                placeholder={`${li.price} 원`}
                disabled
              />

              <RegistLabel>결제 방법</RegistLabel>
              <RegistInput type="text" placeholder="무통장입금" disabled />
              <RegistLabel>결제 상태 </RegistLabel>
              <RegistInput
                type="text"
                placeholder={`${li.payStatus}${
                  li.payStatus === "입금대기"
                    ? ": 우리은행 예금주 이광자 124-233998-12-601"
                    : ""
                }`}
                disabled
                finished
              />
              {li.payStatus === "입금대기" ? (
                <>
                  <span style={{ marginBottom: "20px" }}>
                    {AddDays(
                      new Date(li.applyDate).toISOString().substring(0, 10),
                      7,
                    )
                      .toISOString()
                      .substring(0, 10)}{" "}
                    까지 입금이 확인 되지 않는 경우 자동 취소됩니다.
                  </span>
                </>
              ) : (
                ""
              )}
            </Fragment>
          ))
        )}

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
