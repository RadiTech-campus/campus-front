import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../../components/modal/Modal";

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
  margin: 248px 0px;
  padding: 0px 15px;
  background-color: white;
  color: #595959;
  font-size: 16px;
  font-weight: bold;
`;
const PriceText = styled.div`
  position: absolute;
  margin: 520px 0px;
  padding: 0px 15px;
  background-color: white;
  color: #595959;
  font-size: 16px;
  font-weight: bold;
`;
const PayText = styled.div`
  position: absolute;
  margin: 705px 0px;
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

const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;
const ModalContent = styled.div`
  font-size: 15px;
  text-align: center;
  margin-bottom: 10px;
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

  useEffect(() => {
    if (auth.isAuthenticated) {
      setInputs({
        ...inputs,
        userName: auth.username,
        email: auth.useremail,
        phoneNumber: auth.userPhone,
      });
    } else {
      router.push("/signin");
    }
  }, [auth]);

  const [checked, setChecked] = useState(12);
  const handleChecked = (e) => {
    setChecked(Number(e.target.value));
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  return (
    <SignUpContainer>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            router.push("/verify");
          }}
        >
          <>
            <ModalTitle>주문 확정 안내</ModalTitle>
            <ModalContent>
              {
                "할인율 100% -> RadiTech-campus를 바로 사용하실 수 있습니다. 국시 합격을 기원합니다"
              }
            </ModalContent>
            OR
            <ModalContent>
              {
                "할인율 100% 이하-> 결제 확인 후 서비스 이용 가능합니다. 확인까지 영업일 3일 정도 소요되며 주문이 확정되면 문자/메일 안내가 갈 예정입니다"
              }
            </ModalContent>
          </>
        </Modal>
      )}
      <TitleContainer>수강신청하기</TitleContainer>
      <RegistBox>
        {/* <form noValidate> */}
        <InputsContainer>
          <ClassText>수강정보</ClassText>
          <Divider />

          <RegistLabel>강의명</RegistLabel>
          <RegistSelect value={userId} onChange={onChange}>
            <option>심지나의 임상 합격 ALL PASS</option>
          </RegistSelect>
          <RegistLabel>기간</RegistLabel>
          <PeriodContainer>
            {periods.map((period) => (
              <PeriodLabel>
                <input
                  type="radio"
                  value={period}
                  checked={checked === period}
                  onChange={(e) => handleChecked(e)}
                />
                {`${period}개월`}
              </PeriodLabel>
            ))}
          </PeriodContainer>

          <UserText>구매자 정보</UserText>
          <Divider />
          <RegistLabel>이름</RegistLabel>
          <RegistInput type="text" disabled value={userName} />

          <RegistLabel>메일</RegistLabel>
          <RegistInput type="email" disabled value={email} />

          <RegistLabel>휴대번호</RegistLabel>
          <RegistInput type="number" disabled value={phoneNumber} />

          <PriceText>가격 정보</PriceText>
          <Divider />
          <PriceContainer>
            <PriceTitle>할인율</PriceTitle>
            <PriceDetail>
              <PriceContent>100% - 연세대학교 MOU</PriceContent>
            </PriceDetail>
          </PriceContainer>
          <PriceContainer>
            <PriceTitle>가격</PriceTitle>
            <PriceDetail>
              <PriceContent canceled>400,000 원</PriceContent>
              <PriceContent>{"->"}</PriceContent>
              <PriceContent bolded finalPrice>
                0 원
              </PriceContent>
            </PriceDetail>
          </PriceContainer>

          <PayText>결제 방법</PayText>
          <Divider />
          <PriceContainer>
            <PriceTitle>결제기한</PriceTitle>
            <PriceDetail>
              <PriceContent>2023.2.2 까지</PriceContent>
            </PriceDetail>
            <div style={{ color: "red", fontSize: "14px", fontWeight: "bold" }}>
              *기간내 미 결제시 수강신청이 취소됩니다
            </div>
          </PriceContainer>

          <PriceContainer>
            <PriceTitle>결제방법</PriceTitle>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ margin: "5px 0px 0px" }}>
                <input type="radio" checked />
                계좌이체: 우리은행 22222-2222-2222
                <button disabled>계좌 복사</button>
              </label>
              <label style={{ margin: "5px 0px 10px" }}>
                <input type="radio" disabled />
                신용카드: 준비중 입니다.
              </label>
            </div>
            <div style={{ color: "red", fontSize: "14px", fontWeight: "bold" }}>
              *유료서비스를 이용하지 않았을 경우 환불 가능합니다.
            </div>
          </PriceContainer>
          {/* <RegistButton onClick={() => router.push("/verify")}> */}
          <RegistButton onClick={() => handleOpenModal()}>
            수강신청
          </RegistButton>
        </InputsContainer>
        {/* </form> */}
      </RegistBox>
    </SignUpContainer>
  );
}
