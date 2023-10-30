import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../modal/Modal";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useGetPayment } from "../../query/contents";
import { updatePayStatus } from "../../api/contents_api";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  margin: 0px auto;
  width: 1160px;
  position: "sticky";
  top: 0;
  z-index: 10;
  background-color: "white";
  @media (max-width: 620px) {
    width: 100%;
    margin: 0 auto;
    padding: 0px;
  }
`;

const MobileLogo = styled.img`
  width: 195px;
  @media (max-width: 620px) {
    width: 150px;
    padding: 10px 5px;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  margin-left: 10px;
  background-color: #ededed74;
  border: 1px solid #dbdbdb9b;
  border-radius: 20px;
  display: flex;
  align-items: center;
  > svg {
    color: #d3d3d3;
    height: 24px;
    padding-left: 15px;
  }
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  height: 34px;
  width: 400px;
  font-size: 20px;
  border-radius: 20px;
  outline: none;
`;

const AuthContainer = styled.div`
  font-size: 13px;
  display: flex;
  @media (max-width: 620px) {
    width: 100%;
    justify-content: end;
    /* font-size: 15px; */
    font-weight: 600;
  }
`;

const AuthButton = styled.div`
  margin-right: 20px;
  cursor: pointer;
  @media (max-width: 620px) {
    border-bottom: ${(props) => (props.selected ? "2px solid black;" : "")};
    margin-right: 15px;
  }
`;
export default function Header({ onMoveToForm }) {
  const router = useRouter();
  const auth = useAuth();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const { data: paymentData, isLoading } = useGetPayment(auth.username);
  const data = useMemo(() => paymentData?.Items || [], [paymentData]);

  useEffect(() => {
    if (!isLoading) {
      const filtered = data.filter(
        (li) =>
          li.payStatus === "결제완료" && new Date() > new Date(li.endDate),
      );
      if (filtered.length > 0) {
        for (let index = 0; index < filtered.length; index++) {
          const element = filtered[index];
          console.log("call 전");
          updatePayStatus({
            id: element.id,
            payStatus: "기간만료",
            endDate: element.endDate,
            applyedStatus: "사용종료",
          });
          console.log("call 후");
        }
      }
    }
  }, [data, isLoading]);

  return (
    <>
      {isOpen ? (
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div>결제, 환불, 서비스 이용 관련해서는 메일로 문의 주세요.​</div>
          <div>고객센터 : raditech.campus@gmail.com</div>
        </Modal>
      ) : (
        ""
      )}
      <HeaderContainer>
        <LogoContainer>
          <Link href={"/"}>
            {isMobile ? (
              <MobileLogo src="/titlelogo.png" alt="레디테크 캠퍼스" />
            ) : (
              <Image
                src="/titlelogo.png"
                alt="레디테크 캠퍼스"
                width={190}
                height={35}
                style={{ marginRight: "5px" }}
              />
            )}
          </Link>
          {/* <SearchContainer>
            <Search />
            <SearchInput disabled />
          </SearchContainer> */}
        </LogoContainer>
        {auth.isAuthenticated ? (
          <AuthContainer isMobile={isMobile}>
            {isMobile ? (
              ""
            ) : (
              <AuthButton onClick={() => router.push("/mypage")}>
                안녕하세요 {auth.username} 님
              </AuthButton>
            )}

            <AuthButton
              selected={router.pathname === "/mypage"}
              onClick={() => router.push("/mypage")}
            >
              마이페이지
            </AuthButton>
            <AuthButton
              onClick={() => {
                auth.signOut();
                router.push("/");
                router.reload();
              }}
            >
              로그아웃
            </AuthButton>
            <AuthButton
              onClick={() => {
                // onMoveToForm();
                handleOpenModal();
              }}
            >
              고객센터
            </AuthButton>
          </AuthContainer>
        ) : (
          <AuthContainer>
            <AuthButton onClick={() => router.push("/signin")}>
              로그인
            </AuthButton>
            <AuthButton onClick={() => handleOpenModal()}>고객센터</AuthButton>
          </AuthContainer>
        )}
      </HeaderContainer>
      {/* <BorderLine /> */}
    </>
  );
}
