import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useGetContentDetails } from "../../../query/contents";
import Link from "next/link";
import { useAuth } from "../../../hooks/useAuth";
import Modal from "../../../components/modal/Modal";
import { useGetPayment } from "../../../query/contents";

const LectureDetailContainer = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px; */
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
  /* background-color: ${(props) =>
    props.selected ? "#898989" : "#a603a6"}; */
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
  const { lsid, detailCode, classtype, title } = router.query;

  const { data: contentDetailData } = useGetContentDetails(lsid);
  const data = useMemo(
    () => contentDetailData?.Items || [],
    [contentDetailData, lsid],
  );

  const { data: paymentData } = useGetPayment("rudghksldl");
  const data2 = useMemo(() => paymentData?.Items || [], [paymentData]);

  console.log(
    "data2",
    data2.filter(
      (li) => li.status === "입금대기" && li.productCode.includes("A_A01"),
    ),
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      setIsOpen(true);
    } else {
      // if (data2.find((li) => li.status === "결제완료").length < 1) {
      //   router.push(`/signin?returnpath=${router.asPath}`);
      // }
    }
  }, [auth]);

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
            {/* <ModalTitle>{title}</ModalTitle> */}
            <ModalTitle>{"로그인이 필요한 서비스 입니다."}</ModalTitle>
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
                      pathname: `/lecture/lecturedetail/${li.contentCode}`,
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
          <>
            {/* <div>
              {`${title} - ${
                data.filter((li) => li.contentDetailCode === detailCode)[0]
                  .contentDetailTitle
              }`}
            </div> */}
            <div>
              <iframe
                src={`https://player.vimeo.com/video/${
                  data.filter((li) => li.contentDetailCode === detailCode)[0]
                    .contentURL
                }`}
                width="900"
                height="564"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </>
        ) : null}
      </ContentContainer>
      <Divider />
    </LectureDetailContainer>
  );
}
