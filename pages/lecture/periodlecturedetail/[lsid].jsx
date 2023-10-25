import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useGetContentDetails, useGetContents } from "../../../query/contents";
import Link from "next/link";
import { useAuth } from "../../../hooks/useAuth";
import Modal from "../../../components/modal/Modal";
import useIsPeriod from "../../../hooks/useIsPeriod";

const LectureDetailContainer = styled.div`
  display: flex;
  margin: 0px auto;
  width: 1160px;
`;

const SidebarContainer = styled.div`
  width: 20%;
  padding: 10px;
`;

const SidebarTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 10px;
`;

const SidebarContent = styled.div`
  padding-bottom: 5px;
  border-bottom: 1px solid lightgrey;
  padding: 15px 0px;
  font-weight: ${(props) => (props.selected ? "" : "bold")};
  a {
    text-decoration: none;
    color: ${(props) => (props.selected ? "#838383" : "black")};
  }
`;
const ContentContainer = styled.div`
  width: 80%;
`;

const Divider = styled.div`
  border-bottom: 0.1rem solid #e6e8eb;
  margin: 20px 0px;
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

export default function LectureDetail() {
  const auth = useAuth();
  const router = useRouter();
  const { lsid, classtype, title } = router.query;
  const { data: contentDetailData, isLoading } = useGetContentDetails(lsid);
  const data = useMemo(
    () => contentDetailData?.Items || [],
    [contentDetailData, lsid],
  );

  const { data: contentData } = useGetContents();
  const data2 = useMemo(
    () => contentData?.Items || [],
    [contentData, lsid, auth],
  );
  const { startDate, endDate } = useMemo(
    () =>
      data2.filter((li) => li.code === lsid)[0] || {
        startDate: "",
        endDate: "",
      },
    [data2],
  );
  const { isPeriod } = useIsPeriod(startDate, endDate);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  useEffect(() => {
    if (!isPeriod) {
      setIsOpen2(true);
    }
  }, [isPeriod]);

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated) {
        setIsOpen(true);
      }
    }
  }, [auth]);

  const [detailCode, setDetailCode] = useState();

  useEffect(() => {
    if (!isLoading) {
      if (data && data.length > 0) {
        setDetailCode(data[0].contentDetailCode);
      }
    }
  }, [data]);

  return (
    <LectureDetailContainer>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            router.push(`/signin?returnpath=${router.asPath}`);
          }}
        >
          <>
            <ModalTitle>{"로그인이 필요한 서비스 입니다."}</ModalTitle>
          </>
        </Modal>
      )}
      {isOpen2 && (
        <Modal
          open={isOpen2}
          onClose={() => {
            setIsOpen2(false);
            router.push(`/`);
          }}
        >
          <>
            <ModalTitle>{"공개 기간이 아닙니다."}</ModalTitle>
          </>
        </Modal>
      )}
      <SidebarContainer>
        <SidebarTitle>{title}</SidebarTitle>
        {data && data.length > 0
          ? data
              ?.filter((arr) => arr.contentDetailSubTitle === classtype)
              ?.sort((a, b) => (a.sorting > b.sorting ? 1 : -1))
              .map((li, i) => (
                <SidebarContent
                  key={i}
                  selected={detailCode !== li.contentDetailCode}
                >
                  <Link
                    href={{
                      pathname: `/lecture/freelecturedetail/${li.contentCode}`,
                      query: {
                        detailCode: li.contentDetailCode,
                        classtype,
                        title,
                      },
                    }}
                  >{`# ${i + 1}. ${li.contentDetailTitle}`}</Link>
                </SidebarContent>
              ))
          : "강의가 준비중 입니다"}
      </SidebarContainer>
      <ContentContainer>
        {data && data.length > 0 ? (
          <div>
            <iframe
              src={`https://player.vimeo.com/video/${
                data.filter((li) => li.contentDetailCode === detailCode)[0]
                  ?.contentURL
              }`}
              width="900"
              height="564"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        ) : null}
      </ContentContainer>
      <Divider />
    </LectureDetailContainer>
  );
}
