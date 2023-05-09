import React, { useMemo } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useGetContentDetails } from "../../../query/contents";
import Link from "next/link";

const LectureDetailContainer = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px; */
  display: flex;
  margin: 0px auto;
  width: 100%;
`;

const SidebarContainer = styled.div`
  width: 20%;
  padding: 30px;
`;

const SidebarTitle = styled.div`
  font-size: larger;
  font-weight: 600;
  padding-bottom: 10px;
`;

const SidebarContent = styled.div`
  padding-bottom: 5px;
  background-color: ${(props) => (props.selected ? "#898989" : "#a603a6")};
`;
const ContentContainer = styled.div`
  width: 80%;
`;

const Divider = styled.div`
  border-bottom: 0.1rem solid #e6e8eb;
  margin: 20px 0px;
`;

export default function LectureDetail() {
  const router = useRouter();
  const { lsid, detailCode, classtype, title } = router.query;

  const { data: contentDetailData } = useGetContentDetails(lsid);
  const data = useMemo(
    () => contentDetailData?.Items || [],
    [contentDetailData, lsid],
  );
  console.log(
    "data",
    data.filter((li) => li.contentDetailCode === detailCode)[0],
  );
  return (
    <LectureDetailContainer>
      <SidebarContainer>
        <SidebarTitle>{title}</SidebarTitle>
        {data && data.length > 0
          ? data
              .filter((arr) => arr.contentDetailSubTitle === classtype)
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
            <div>
              {`${title} - ${
                data.filter((li) => li.contentDetailCode === detailCode)[0]
                  .contentDetailTitle
              }`}
            </div>
            <div>
              <iframe
                src={`https://player.vimeo.com/video/${
                  data.filter((li) => li.contentDetailCode === detailCode)[0]
                    .contentURL
                }`}
                width="1000"
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
