import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../../components/modal/Modal";
import {
  useGetAUniv,
  useGetProduct,
  useGetProducts,
} from "../../query/contents";
import { AddDays } from "../../libs/date";

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
  margin: 127px 0px;
  padding: 0px 15px;
  background-color: white;
  color: #595959;
  font-size: 16px;
  font-weight: bold;
`;
const PriceText = styled.div`
  position: absolute;
  margin: 398px 0px;
  padding: 0px 15px;
  background-color: white;
  color: #595959;
  font-size: 16px;
  font-weight: bold;
`;
const PayText = styled.div`
  position: absolute;
  margin: 580px 0px;
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

const periods = ["03", "06", "12"];
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

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const { data: aUnivData } = useGetAUniv(
    email.substring(email.indexOf("@") + 1),
  );
  const data = useMemo(() => aUnivData?.Item || [], [email, aUnivData, inputs]);

  const { data: productsData } = useGetProducts();
  const data3 = useMemo(() => productsData?.Items || [], [productsData]);
  const [Selected, setSelected] = useState("A_A01_12");
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  const { data: productData } = useGetProduct(Selected);
  const data2 = useMemo(() => productData?.Item || [], [Selected, productData]);

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText("124-233998-12-601");
      alert("계좌번호가 복사 되었습니다");
    } catch (error) {
      alert("복사를 실패했습니다!");
    }
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
          <RegistSelect onChange={handleSelect} value={Selected}>
            {data3 &&
              data3.length > 0 &&
              data3
                .sort((a, b) => (a.productCode > b.productCode ? 1 : -1))
                .map((li, i) => (
                  <option key={i} value={li.productCode}>
                    {li.productTitle}
                  </option>
                ))}
          </RegistSelect>
          {/* <RegistLabel>기간</RegistLabel>
          <PeriodContainer>
            {periods.map((period, i) => (
              <PeriodLabel key={i}>
                <input
                  type="radio"
                  value={period}
                  checked={checked === period}
                  onChange={(e) => handleChecked(e)}
                />
                {`${period.replace("0", "")} 개월`}
              </PeriodLabel>
            ))}
          </PeriodContainer>
          {console.log("checked", checked)} */}
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
              <PriceContent>
                {data?.discount} % {data?.name} MOU 채결
              </PriceContent>
            </PriceDetail>
          </PriceContainer>
          <PriceContainer>
            <PriceTitle>가격</PriceTitle>
            <PriceDetail>
              <PriceContent canceled>{data2?.price} 원</PriceContent>
              <PriceContent>{"->"}</PriceContent>
              <PriceContent bolded finalPrice>
                {data &&
                  data2 &&
                  data2.price - data2.price * (data.discount / 100)}{" "}
                원
              </PriceContent>
            </PriceDetail>
          </PriceContainer>

          <PayText>결제 방법</PayText>
          <Divider />
          <PriceContainer>
            <PriceTitle>결제기한</PriceTitle>
            <PriceDetail>
              {/* <PriceContent>2023.2.2 까지</PriceContent> */}
              <PriceContent>
                {AddDays(new Date().toISOString().substring(0, 10), 7)
                  .toISOString()
                  .substring(0, 10)}{" "}
                까지
              </PriceContent>
            </PriceDetail>
            <div style={{ color: "red", fontSize: "14px", fontWeight: "bold" }}>
              *기간내 미 결제시 수강신청이 취소됩니다
            </div>
          </PriceContainer>

          <PriceContainer>
            <PriceTitle>결제방법</PriceTitle>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ margin: "5px 0px 0px" }}>
                <input type="radio" defaultChecked />
                계좌이체: 우리은행 예금주
                <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                  이광자 124-233998-12-601
                  <button
                    style={{ marginLeft: "20px" }}
                    onClick={() => handleCopyClipBoard()}
                  >
                    계좌 복사
                  </button>
                </div>
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
