import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../modal/Modal";
import { useIsMobile } from "../../hooks/useIsMobile";

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
    /* width: 620px; */
    width: 100%;
    margin: 0 auto;
    padding: 0px;
    flex-direction: column;
    align-items: flex-start;
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
    border-bottom: 1px solid lightgray;
  }
`;

const AuthButton = styled.div`
  margin-right: 20px;
  cursor: pointer;
  @media (max-width: 620px) {
    border-bottom: ${(props) => (props.selected ? "2px solid black;" : "")};
    margin: 0px 5px 0px;
  }
`;
export default function Header({ onMoveToForm }) {
  const router = useRouter();
  const auth = useAuth();
  const isMobile = useIsMobile();
  console.log("router", router);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };
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
              <MobileLogo
                src="/titlelogo.png"
                alt="메인 배경 이미지"
                style={{ marginRight: "5px" }}
              />
            ) : (
              <Image
                src="/titlelogo.png"
                alt="메인 배경 이미지"
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
          <AuthContainer>
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
