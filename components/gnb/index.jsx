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
  justify-content: start;
  padding: 15px 20px;
  margin: 0px auto;
  width: 1160px;
  position: "sticky";
  top: 0;
  z-index: 10;
  background-color: "white";
  @media (max-width: 650px) {
    display: none;
  }
`;

const AuthButton = styled.div`
  margin-right: 20px;
  cursor: pointer;
  width: 10%;
  text-align: center;
  /* background-color: rebeccapurple; */
`;
export default function GNB({ onMoveToForm }) {
  const router = useRouter();
  const auth = useAuth();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <HeaderContainer>
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
        onClick={() => {
          router.push("/mypage");
        }}
      >
        마이룸
      </AuthButton>
      <AuthButton onClick={() => handleOpenModal()}>고객센터</AuthButton>
    </HeaderContainer>
  );
}
