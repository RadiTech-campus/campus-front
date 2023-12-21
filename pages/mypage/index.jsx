import { Fragment, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import Image from "next/image";
import { useGetPayment } from "../../query/contents";
import { useGetPaymentsList } from "../../query/new/queries";
import { AddDays, getDateDiff } from "../../libs/date";
import { canclePayment } from "../../api/contents_api";

const SignInContainer = styled.div`
  margin: 100px auto 15px;
  width: 1160px;
  @media (max-width: 650px) {
    margin: 0px auto;
    padding: 15px;
    width: 100%;
  }
`;

const TitleContainer = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0px;
  @media (max-width: 650px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const LogoutButton = styled.button`
  display: none;
  @media (max-width: 650px) {
    display: block;
    background-color: transparent;
    border: 1px solid #a2a2a2;
    border-radius: 5px;
    color: #a2a2a2;
    padding: 3px 5px;
  }
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

  const { data: paymentData } = useGetPaymentsList(auth?.username);
  console.log("paymentData", paymentData);
  // const data = useMemo(
  //   () =>
  //     paymentData?.Items?.sort(
  //       (a, b) => new Date(b.applyDate) - new Date(a.applyDate),
  //     ) || [],
  //   [username, paymentData],
  // );

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

  const handleCopyClipBoard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("124-233998-12-601");
    alert("계좌번호가 복사 되었습니다");
  };

  return (
    <SignInContainer>
      <div>My Page</div>
      <TitleContainer>
        기본 정보
        <LogoutButton
          onClick={() => {
            auth.signOut();
            router.push("/");
          }}
        >
          로그아웃
        </LogoutButton>
      </TitleContainer>
      <InputsContainer>
        <Divider />
        <SignInLabel>이름</SignInLabel>
        <div
          style={{
            width: "100%",
            marginBottom: "20px",
            backgroundColor: "#eeeeee",
          }}
        >
          <SignInInput type="text" placeholder={userName} disabled />
        </div>
        <SignInLabel>이메일</SignInLabel>
        <div
          style={{
            width: "100%",
            marginBottom: "20px",
            backgroundColor: "#eeeeee",
          }}
        >
          <SignInInput type="text" placeholder={email} disabled />
        </div>
        <SignInLabel>휴대폰 번호</SignInLabel>
        <div
          style={{
            width: "100%",
            marginBottom: "20px",
            backgroundColor: "#eeeeee",
          }}
        >
          <SignInInput type="text" disabled placeholder={phoneNumber} />
        </div>
      </InputsContainer>
      <TitleContainer>수강 신청 정보</TitleContainer>
      <InputsContainer>
        {paymentData && paymentData < 1 && (
          <Fragment>
            <Divider />

            <RegistLabel>강의명</RegistLabel>
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
              <RegistInput
                type="text"
                placeholder="수강 이력이 없습니다"
                disabled
              />
            </div>

            <RegistLabel>결제 방법</RegistLabel>

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
              <RegistInput type="text" placeholder="" disabled />
            </div>
            <RegistLabel>결제 상태 </RegistLabel>
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
              <RegistInput type="text" placeholder="" disabled />
            </div>
          </Fragment>
        )}
        {paymentData &&
          paymentData.length > 0 &&
          paymentData.map((li, i) => (
            <Fragment key={i}>
              <Divider />
              <RegistLabel>강의명</RegistLabel>
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
                <RegistInput
                  type="text"
                  placeholder={li.product.productTitle}
                  disabled
                />
              </div>
              <RegistLabel>결제 금액</RegistLabel>
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
                <RegistInput
                  type="text"
                  placeholder={`${li.price} 원`}
                  disabled
                />
              </div>

              <RegistLabel>결제 방법</RegistLabel>
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
                <RegistInput type="text" placeholder="무통장입금" disabled />
              </div>
              <RegistLabel>결제 상태 </RegistLabel>
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
                <RegistInput
                  type="text"
                  placeholder={`${li.payStatus}`}
                  disabled
                  finished
                />

                {(li?.payStatus === "결제완료" && li?.watched === 0) ||
                  (li?.payStatus === "결제대기" && (
                    <button
                      style={{
                        width: "80px",
                        border: "none",
                        backgroundColor: "#E96962",
                        color: "white",
                        padding: "5px 0px",
                        borderRadius: "5px",
                        height: "30px",
                        fontWeight: "700",
                        marginRight: "5px",
                      }}
                      onClick={() => {
                        cancelPay(li.id);
                      }}
                    >
                      취소
                    </button>
                  ))}

                {li?.payStatus === "결제완료" && (
                  <button
                    style={{
                      width: "40%",
                      border: "none",
                      backgroundColor: "#E96962",
                      color: "white",
                      padding: "5px 0px",
                      borderRadius: "5px",
                      height: "30px",
                      fontWeight: "700",
                      marginRight: "5px",
                    }}
                    onClick={() => {
                      router.push("/mypage/delivery");
                    }}
                  >
                    교재 배송지 입력
                  </button>
                )}
              </div>
              {li?.payStatus === "결제대기" && (
                <div
                  style={{
                    marginBottom: "20px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  우리은행 예금주 이광자 124-233998-12-601
                  <button
                    onClick={(e) => handleCopyClipBoard(e)}
                    style={{
                      width: "12%",
                      border: "none",
                      backgroundColor: "#E96962",
                      color: "white",
                      padding: "5px 0px",
                      borderRadius: "5px",
                      height: "30px",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    복사
                  </button>
                </div>
              )}

              {li.payStatus === "결제대기" && (
                <span style={{ marginBottom: "20px", fontSize: "14px" }}>
                  {AddDays(
                    new Date(li.createdAt).toISOString().substring(0, 10),
                    7,
                  )
                    .toISOString()
                    .substring(0, 10)}{" "}
                  까지 입금이 확인 되지 않는 경우 자동 취소됩니다.
                </span>
              )}
            </Fragment>
          ))}

        <TitleContainer>문의 사항</TitleContainer>
        <Divider />

        <PriceContainer>
          <div>결제, 환불, 서비스 이용 관련해서는 메일로 문의 주세요.</div>
          <div>raditech.campus@gmail.com </div>
        </PriceContainer>
      </InputsContainer>
    </SignInContainer>
  );
}
