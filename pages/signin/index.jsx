import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import { useGetPayments } from "../../query/contents";

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const SignInBox = styled.div`
  width: 360px;
  margin: 50px auto;
  border: 0.1rem solid #e6e8eb;
  border-radius: 5px;
  padding: 60px 40px;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  font-size: 24px;
  padding: 10px 0px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginText = styled.div`
  position: absolute;
  margin: 11px 0px;
  padding: 0px 15px;
  font-size: 14px;
  background-color: white;
  color: #595959;
`;

const SignInInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #cbcaca;
  height: 40px;
  outline: none;
  margin-bottom: 40px;
`;

const SignInLabel = styled.label`
  width: 100%;
  font-size: 14px;
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
  cursor: pointer;
`;
const SignInButton2 = styled.button`
  width: 100%;
  border: none;
  margin-bottom: 20px;
  padding: 15px;
  font-size: 16px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const Divider = styled.div`
  border-bottom: 0.1rem solid #e6e8eb;
  margin: 20px 0px;
  width: 100%;
`;

export default function SignIn() {
  const auth = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const executeSignIn = async (event) => {
    event.preventDefault();
    const result = await auth.signIn(username, password);
    if (typeof result === "string" && result !== "SUCCESS") {
      alert("아이디와 비밀번호를 확인해 주세요.");
    } else {
      router.reload();
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (router.query.returnpath && router.query.title) {
        router.push(`${router.query.returnpath}?title${router.query.title}`);
      } else {
        router.push("/");
      }
    }
  }, [auth]);

  return (
    <SignInContainer>
      <SignInBox>
        <form noValidate onSubmit={executeSignIn}>
          <LogoContainer>
            <Image
              src="/titlelogo.png"
              alt="메인 배경 이미지"
              width={160}
              height={30}
              style={{ marginRight: "5px" }}
            />
          </LogoContainer>
          <TitleContainer>
            <div>국시부터 BIG5 취업까지</div>
            <div>레디테크 캠퍼스</div>
          </TitleContainer>
          <InputsContainer>
            <LoginText>로그인</LoginText>
            <Divider />
            <SignInLabel>아이디</SignInLabel>
            <SignInInput
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <SignInLabel>비밀번호</SignInLabel>
            <SignInInput
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <SignInButton1 type="submit">로그인</SignInButton1>
            <SignInButton2 type="button" onClick={() => router.push("/signup")}>
              이메일로 회원가입
            </SignInButton2>
            <SignInButton2
              type="button"
              onClick={() => router.push("/forgotpassword")}
            >
              비밀번호 재설정
            </SignInButton2>
            {/* <SignInButton2 type="button">인증메일 보내기</SignInButton2> */}
          </InputsContainer>
        </form>
      </SignInBox>
    </SignInContainer>
  );
}
