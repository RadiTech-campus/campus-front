import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import JoinPresenter from "../../components/joinpresenter";
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
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px transparent inset;
  }
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
  background-color: ${(props) =>
    props.allCheck && props.mailConfirmed ? "#a603a6" : "#898989"};
  color: white;
  cursor: ${(props) =>
    props.allCheck && props.mailConfirmed ? "pointer" : "default"};
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
  const [mailConfirmed, setMailConfirmed] = useState(false);

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
    if (userId.length < 5) {
      alert("ID는 5자리 이상의 영문으로 입력해 주세요.");
      return;
    }
    if (password.length <= 6 || confirmPassword.length <= 6) {
      alert("비밀번호와 비밀번호 확인을 6자리 이상으로 입력해 주세요.");
      return;
    }
    if (!passwordCheck) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (userName.length < 1) {
      alert("이름을 입력해 주세요.");
      return;
    }
    if (userName.length > 50) {
      alert("이름은 50자 이내로 입력해 주세요.");
      return;
    }
    if (phoneNumber.length < 10) {
      alert("휴대폰 번호는 10~11자리 숫자로 입력해 주세요");
      return;
    }
    if (email.length < 1) {
      handleOpenModal();
      return;
    }

    try {
      const result = await auth.signUp(
        userId,
        password,
        email,
        phoneNumber,
        userName,
      );
      // console.log("confirmUser result", result);
      if (typeof result === "string" && result !== "SUCCESS") {
        if (result === "User already exists") {
          alert("이미 존재하는 아이디 입니다.");
          return;
        } else if (result.includes("custom:phone")) {
          alert("휴대폰 번호는 10~11자리 숫자로 입력해주세요.");
          return;
        } else if (
          result.includes("Password") &&
          result.includes("lowercase")
        ) {
          alert("비밀번호는 소문자를 포함해야 합니다.");
          return;
        } else if (result.includes("email")) {
          alert("아이디를 이메일 형태로 사용할 수 없습니다.");
          return;
        }
      } else {
        setMailConfirmed(true);
        // 여기서 disable 시키면?
        handleOpenModal();
      }
    } catch (error) {
      alert("메일인증 요청 실패 in signup");
      alert(error);
    }
  };

  const executeConfirm = async (event) => {
    event.preventDefault();
    if (code.length !== 6) {
      alert("6자리 인증 코드를 다시 확인해주세요.");
      return;
    }
    if (!mailConfirmed) {
      alert("메일 인증을 해주세요");
      return;
    }
    if (!allCheck) {
      alert("모든 항목을 입력해 주세요");
      return;
    }
    try {
      const result = await auth.confirmSignUp(userId, code);
      // console.log("executeConfirm result", result);
      // console.log("typeof result", typeof result);
      if (typeof result === "string" && result !== "SUCCESS") {
        if (result.includes("Invalid")) {
          alert("메일 인증번호를 확인해 주세요.");
          return;
        }
      } else {
        setConfirmSignUp();
      }
    } catch (error) {
      // console.log("Confirm 실패", error);
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
          {email.length < 1
            ? "메일 주소를 입력해주세요."
            : "인증 메일을 발송했습니다."}
        </Modal>
      )}
      <SignUpBox>
        <form noValidate onSubmit={executeConfirm}>
          <LogoContainer>
            <Image
              src="/titlelogo.png"
              alt="레디테크 캠퍼스"
              width={160}
              height={30}
              style={{ marginRight: "5px" }}
            />
          </LogoContainer>
          <TitleContainer>
            <div>국시부터 BIG5 취업까지</div>
          </TitleContainer>
          <InputsContainer>
            <LoginText>회원가입</LoginText>
            <Divider />

            <SignUpLabel>아이디</SignUpLabel>
            <SignUpInput
              type="text"
              placeholder="영문 아이디"
              name="userId"
              value={userId}
              onChange={onChange}
            />
            <SignUpLabel>비밀번호</SignUpLabel>
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
              type="number"
              placeholder="휴대폰 번호"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
            />
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

            <JoinPresenter allCheck={allCheck} setAllCheck={setAllCheck} />
            <SignUpButton1
              allCheck={allCheck}
              mailConfirmed={mailConfirmed}
              disabled={!allCheck || !mailConfirmed}
              type="submit"
            >
              회원가입
            </SignUpButton1>
          </InputsContainer>
        </form>
      </SignUpBox>
    </SignUpContainer>
  );
}
