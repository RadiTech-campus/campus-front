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
  justify-content: space-evenly;
  padding: 20px 0px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: white;
  @media (max-width: 650px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AuthContainer = styled.div`
  font-size: 13px;
  display: flex;

  @media (max-width: 650px) {
    width: 100%;
    justify-content: end;
    /* font-size: 15px; */
    font-weight: 600;
  }
`;

const AuthButton = styled.div`
  margin-right: 20px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
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
          updatePayStatus({
            id: element.id,
            payStatus: "기간만료",
            endDate: element.endDate,
            applyedStatus: "사용종료",
          });
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
            <img
              src="/mainlogo.png"
              alt="레디테크 캠퍼스"
              style={{ marginRight: "25px", height: "27px" }}
            />
          </Link>
          <AuthButton
            onClick={() => {
              router.push("/");
            }}
          >
            홈
          </AuthButton>
          <AuthButton
            onClick={() => {
              router.push("/gosi");
            }}
          >
            국가고시
          </AuthButton>
          <AuthButton
            onClick={() => {
              router.push("/job");
            }}
          >
            취업특강
          </AuthButton>
          <AuthButton
            selected={router.pathname === "/mypage"}
            onClick={() => router.push("/mypage")}
          >
            마이룸
          </AuthButton>
          <AuthButton
            onClick={() => {
              // onMoveToForm();
              handleOpenModal();
            }}
          >
            고객센터
          </AuthButton>
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
              onClick={() => {
                auth.signOut();
                router.push("/");
                router.reload();
              }}
            >
              로그아웃
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
