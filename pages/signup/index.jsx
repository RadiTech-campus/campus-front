import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import JoinPresenter from "../../components/\bjoinpresenter";
import Modal from "../../components/modal/Modal";
import SignUpModal from "../../components/modal/SignUpModal";
import { useAuth } from "../../hooks/useAuth";

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const SignUpBox = styled.div`
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

const SignUpInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #cbcaca;
  height: 40px;
  outline: none;
  margin-bottom: 20px;
`;

const SignUpLabel = styled.label`
  width: 100%;
  font-size: 14px;
`;

const ConfirmedPassword = styled.div`
  color: #00d607;
  font-size: 14px;
  width: 100%;
  margin-top: -17px;
  margin-bottom: 20px;
`;
const UnconfirmedPassword = styled.div`
  color: #ff0000;
  font-size: 14px;
  width: 100%;
  margin-top: -17px;
  margin-bottom: 20px;
`;

const SignUpButton1 = styled.button`
  width: 100%;
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 15px;
  font-size: 16px;
  background-color: ${(props) => (props.disabled ? "#898989" : "#a603a6")};
  color: white;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const MailAuthContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;
const SignUpMailInput = styled.input`
  width: 90%;
  border: none;
  border-bottom: 1px solid #cbcaca;
  margin-right: 5px;
  height: 40px;
  outline: none;
`;
const SignUpButton2 = styled.button`
  width: 50%;
  border: none;
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
`;

const Divider = styled.div`
  border-bottom: 0.1rem solid #e6e8eb;
  margin: 20px 0px;
  width: 100%;
`;

const Button = styled.button`
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  background-color: #fa9f98;
  border-radius: 10px;
  color: white;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  &:hover {
    background-color: #fac2be;
  }
`;

const AppWrap = styled.div`
  text-align: center;
  margin: 50px auto;
`;

export default function SignUp() {
  const auth = useAuth();
  const router = useRouter();
  const [allCheck, setAllCheck] = useState(false);

  const [passwordCheck, setPasswordCheck] = useState(false);

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

  const confirmUser = async (e) => {
    e.preventDefault();
    if (email.length < 5) {
      handleOpenModal();
      return;
    }
    try {
      const result = await auth.signUp(userId, password, email);
      // console.log("result", result);
      handleOpenModal();
    } catch (error) {
      // console.log("error", error);
      alert("메일인증 요청 실패");
      alert(error);
    }
  };

  const executeConfirm = async (event) => {
    event.preventDefault();
    try {
      const result = await auth.confirmSignUp(userId, code);
      // console.log("Confirm 성공", result);

      confirmSignUp();
    } catch (error) {
      // console.log("Confirm 실패", error);
    }
  };

  // console.log("auth", auth);

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false);
    }
  }, [password, confirmPassword]);

  // useEffect(() => {}, []);
  const [isOpenConfirmSignUp, setIsOpenConfirmSignUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const confirmSignUp = () => {
    setIsOpenConfirmSignUp(true);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <SignUpContainer>
      {isOpenConfirmSignUp && (
        <SignUpModal
          open={isOpenConfirmSignUp}
          userId={userId}
          onClose={() => {
            setIsOpenConfirmSignUp(false);
            onReset();
            router.push("/signin");
          }}
        />
      )}
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          {email.length < 5
            ? "잘못된 이메일입니다."
            : "인증 메일을 발송했습니다."}
        </Modal>
      )}
      <SignUpBox>
        <form noValidate onSubmit={executeConfirm}>
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
            <div>심지나 특강</div>
          </TitleContainer>
          <InputsContainer>
            <LoginText>회원가입</LoginText>
            <Divider />

            <SignUpLabel>아이디</SignUpLabel>
            <SignUpInput
              type="text"
              placeholder="아이디"
              name="userId"
              value={userId}
              onChange={onChange}
            />
            <SignUpLabel>비밀번호</SignUpLabel>
            <SignUpInput
              type="password"
              placeholder="영문, 대문자, 특수문자, 8자 이상 필수"
              name="password"
              value={password}
              onChange={onChange}
            />

            <SignUpLabel>비밀번호 확인</SignUpLabel>
            <SignUpInput
              type="password"
              placeholder="영문, 대문자, 특수문자, 8자 이상 필수"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
            />
            {password.length > 0 &&
              (passwordCheck ? (
                <ConfirmedPassword>
                  비밀번호와 비밀번호 확인이 일치합니다.
                </ConfirmedPassword>
              ) : (
                <UnconfirmedPassword>
                  * 비밀번호와 비밀번호와 확인이 일치하지 않습니다.
                </UnconfirmedPassword>
              ))}

            <SignUpLabel>메일</SignUpLabel>
            <MailAuthContainer>
              <SignUpMailInput
                type="email"
                placeholder="이메일"
                name="email"
                value={email}
                onChange={onChange}
              />
              <SignUpButton2 type="button" onClick={(e) => confirmUser(e)}>
                메일인증 발송
              </SignUpButton2>
            </MailAuthContainer>
            <SignUpLabel>메일 인증 코드</SignUpLabel>
            <SignUpInput
              type="text"
              placeholder="인증코드"
              name="code"
              value={code}
              onChange={onChange}
            />

            <SignUpLabel>이름</SignUpLabel>
            <SignUpInput
              type="text"
              placeholder="이름"
              name="userName"
              value={userName}
              onChange={onChange}
            />
            <SignUpLabel>휴대폰 번호</SignUpLabel>
            <SignUpInput
              type="text"
              placeholder="휴대폰 번호"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
            />
            <JoinPresenter allCheck={allCheck} setAllCheck={setAllCheck} />
            <SignUpButton1 disabled={!allCheck} type="submit">
              회원가입
            </SignUpButton1>
          </InputsContainer>
        </form>
      </SignUpBox>
    </SignUpContainer>
  );
}
