import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import SignUpModal from "../../components/modal/SignUpModal";
import { useAuth } from "../../hooks/useAuth";
import ForgotPasswordModal from "../../components/modal/ForgotPasswordModal";

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

const TitleContainer = styled.div`
  font-size: 24px;
  padding: 10px 0px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background-color: ${(props) => (props.mailConfirmed ? "#898989" : "#a603a6")};
  color: white;
  cursor: ${(props) => (props.mailConfirmed ? "default" : "pointer")};
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

export default function ForgotPassword() {
  const auth = useAuth();
  const router = useRouter();
  const [mailConfirmed, setMailConfirmed] = useState(false);

  const [passwordCheck, setPasswordCheck] = useState(false);

  const [inputs, setInputs] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    code: "",
  });

  const { userId, password, confirmPassword, code } = inputs;

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
      code: "",
    });
  };

  const confirmUser = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.forgotPassword(userId);
      setMailConfirmed(true);
      handleOpenModal();
    } catch (error) {
      alert("메일인증 요청 실패");
      alert(error);
    }
  };

  const executeConfirm = async (event) => {
    event.preventDefault();

    if (!mailConfirmed) {
      alert("메일 인증을 해주세요");
      return;
    }
    try {
      const result = await auth.confirmForgotPassword(userId, code, password);
      console.log("result", result);
      setConfirmSignUp("result", result);
    } catch (error) {
      console.log("Confirm 실패", error);
    }
  };

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false);
    }
  }, [password, confirmPassword]);

  const [isOpenConfirmSignUp, setIsOpenConfirmSignUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const setConfirmSignUp = () => {
    setIsOpenConfirmSignUp(true);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <SignUpContainer>
      {isOpenConfirmSignUp && (
        <ForgotPasswordModal
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
          {"인증 메일을 발송했습니다."}
        </Modal>
      )}
      <SignUpBox>
        <form noValidate onSubmit={executeConfirm}>
          <TitleContainer>
            <div>비밀번호 재설정</div>
          </TitleContainer>
          <InputsContainer>
            <Divider />

            <SignUpLabel>아이디</SignUpLabel>
            <SignUpInput
              type="text"
              placeholder="영문 아이디"
              name="userId"
              value={userId}
              onChange={onChange}
            />
            <SignUpButton2 type="button" onClick={(e) => confirmUser(e)}>
              메일인증 발송
            </SignUpButton2>
            <SignUpLabel>메일 인증 코드</SignUpLabel>
            <SignUpInput
              type="text"
              placeholder="인증코드"
              name="code"
              value={code}
              onChange={onChange}
            />
            <SignUpLabel>새 비밀번호</SignUpLabel>
            <SignUpInput
              type="password"
              placeholder="영문, 6자 이상 필수"
              name="password"
              value={password}
              onChange={onChange}
            />

            <SignUpLabel>비밀번호 확인</SignUpLabel>
            <SignUpInput
              type="password"
              placeholder="영문, 6자 이상 필수"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
            />
            {password.length > 5 &&
              confirmPassword.length > 5 &&
              (passwordCheck ? (
                <ConfirmedPassword>
                  비밀번호와 비밀번호 확인이 일치합니다.
                </ConfirmedPassword>
              ) : (
                <UnconfirmedPassword>
                  * 비밀번호와 비밀번호와 확인이 일치하지 않습니다.
                </UnconfirmedPassword>
              ))}

            <SignUpButton1 mailConfirmed={!mailConfirmed} type="submit">
              비밀번호 변경
            </SignUpButton1>
          </InputsContainer>
        </form>
      </SignUpBox>
    </SignUpContainer>
  );
}