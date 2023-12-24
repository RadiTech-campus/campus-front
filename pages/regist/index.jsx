import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../../components/modal/Modal";
import { AddDays } from "../../libs/date";
import { useCreateAPayment, useGetAllProduct } from "../../query/new/queries";
import { ThreeDots } from "react-loader-spinner";

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
  margin: ${(props) => (props.discount ? "510px 0px" : "576px 0px")};
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
  @media (max-width: 650px) {
    display: none;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: ${(props) => (props.finalPrice ? "16px" : "16px")};
  color: ${(props) => (props.finalPrice ? "#7100a6" : "")};
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
  background-color: #a2a2a2;
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

export default function SignUp() {
  const auth = useAuth();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    userName: "",
    phoneNumber: "",
  });

  const { email, userName, phoneNumber } = inputs;

  useEffect(() => {
    if (auth.isAuthenticated) {
      setInputs({
        email: auth.useremail,
        userName: auth.userName,
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

  const [Selected, setSelected] = useState(Number(router.query.id));

  const handleSelect = (e) => {
    setSelected(Number(e.target.value));
  };

  const { mutate: paymentMutate } = useCreateAPayment(auth.username, Selected);
  const onSubmit = (e) => {
    e.preventDefault();
    paymentMutate();
    handleOpenModal();
  };

  const handleCopyClipBoard = async (e) => {
    e.preventDefault();
    await navigator.clipboard.writeText("124-233998-12-601");
    alert("계좌번호가 복사 되었습니다");
  };

  // 이하 개편
  const { data: productDatas, isLoading: productDatasIsLoading } =
    useGetAllProduct();

  const data = useMemo(() => productDatas || [], [productDatas]);

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
              결제 확인 후 서비스 이용 가능합니다. 확인까지 영업일 3일 정도
              소요되며 주문이 확정되면 문자/메일 안내가 갈 예정입니다
            </ModalContent>
          </>
        </Modal>
      )}
      <TitleContainer>수강신청하기</TitleContainer>
      <RegistBox>
        <form onSubmit={(e) => onSubmit(e)}>
          <InputsContainer>
            <ClassText>수강정보</ClassText>
            <Divider />
            <RegistLabel>강의명</RegistLabel>
            {productDatasIsLoading ? (
              <ThreeDots
                height="28"
                width="28"
                radius="9"
                color="#7100a6"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              <RegistSelect onChange={handleSelect} value={Selected}>
                {data &&
                  data.length > 0 &&
                  data.map((li, i) => (
                    <option key={i} value={li.id}>
                      {li.productTitle}
                    </option>
                  ))}
              </RegistSelect>
            )}
            <UserText>구매자 정보</UserText>
            <Divider />
            <RegistLabel>
              이름{" "}
              <span style={{ color: "#7100a6" }}>
                (입금자명과 동일해야 합니다.)
              </span>{" "}
            </RegistLabel>
            <RegistInput type="text" disabled value={userName} />
            <RegistLabel>메일</RegistLabel>
            <RegistInput type="email" disabled value={email} />
            <RegistLabel>휴대번호</RegistLabel>
            <RegistInput type="number" disabled value={phoneNumber} />
            <PriceText up>가격 정보</PriceText>
            <Divider />

            <PriceContainer>
              <PriceTitle>가격</PriceTitle>
              <PriceDetail>
                <PriceContent>
                  {data &&
                    data.length > 0 &&
                    data.find((li) => li.id === Selected).price}
                  원
                </PriceContent>
              </PriceDetail>
            </PriceContainer>
            <PayText discount>결제 방법</PayText>

            <Divider />
            <PriceContainer>
              <PriceTitle>결제기한</PriceTitle>
              <PriceDetail>
                <PriceContent>
                  {AddDays(new Date().toISOString().substring(0, 10), 7)
                    .toISOString()
                    .substring(0, 10)}{" "}
                  까지
                </PriceContent>
              </PriceDetail>
              <div
                style={{
                  color: "#7100a6",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
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
                      onClick={(e) => handleCopyClipBoard(e)}
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
              <div
                style={{
                  color: "#7100a6",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                *유료서비스를 이용하지 않았을 경우 환불 가능합니다.
              </div>
            </PriceContainer>
            {/* <RegistButton onClick={() => router.push("/verify")}> */}
            <RegistButton disabled>수강신청</RegistButton>
          </InputsContainer>
        </form>
      </RegistBox>
    </SignUpContainer>
  );
}
