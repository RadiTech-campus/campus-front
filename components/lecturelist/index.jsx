import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const LectureListContainer = styled.div`
  margin: 15px auto;
  width: 1160px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

const Category = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: rgb(237, 35, 75);
`;
const MainTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;
const Description = styled.div`
  font-size: 16px;
  margin-top: 10px;
  margin-left: 10px;
`;

const ClassCardsContainer = styled.div`
  padding: 30px 0px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-evenly; */
  a {
    text-decoration: none;
    border: 0.1rem solid #e6e8ebc2;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    width: 27%;
  }
`;
const ClassCard = styled.div``;
const ClassImage = styled.div`
  height: 150px;
  position: relative;
  > img {
    border-radius: 10px;
  }
`;
const ClassTitle = styled.div`
  /* text-align: center; */
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0px 0px;
  color: black;
`;
const ClassContent = styled.div`
  font-size: 16px;
  color: black;
`;

export default function LectureList({
  category,
  mainTitle,
  description,
  classData,
}) {
  console.log("classData", classData);
  return (
    <LectureListContainer>
      {/* <UserContent> */}
      <TitleContainer>
        <Category>{category}</Category>
        <MainTitle>{mainTitle}</MainTitle>
        <Description>{description}</Description>
      </TitleContainer>

      <ClassCardsContainer>
        {classData?.map((li, i) => (
          <>
            <Link href={"/lecture/12"} key={i}>
              <ClassCard>
                <ClassImage>
                  <Image
                    src="https://cdn.news.unn.net/news/photo/202301/540181_346310_728.jpg"
                    alt="메인 배경 이미지"
                    // width={30}
                    // height={30}
                    style={{ objectFit: "cover" }}
                    fill
                    //   style={{ borderRadius: "50%", marginRight: "5px" }}
                  />
                  {/* {li.thumbnail} */}
                </ClassImage>
                <ClassTitle>{li.secondCat}</ClassTitle>
                {/* <ClassContent>{li.content}</ClassContent> */}
              </ClassCard>
            </Link>
            {li.secondCat === "일촬" ? (
              <Link href={"/lecture/12"} key={i}>
                <ClassCard>
                  <ClassImage>
                    <Image
                      src="https://cdn.news.unn.net/news/photo/202301/540181_346310_728.jpg"
                      alt="메인 배경 이미지"
                      // width={30}
                      // height={30}
                      style={{ objectFit: "cover" }}
                      fill
                      //   style={{ borderRadius: "50%", marginRight: "5px" }}
                    />
                    {/* {li.thumbnail} */}
                  </ClassImage>
                  <ClassTitle>{li.secondCat}-기출</ClassTitle>
                  {/* <ClassContent>{li.content}</ClassContent> */}
                </ClassCard>
              </Link>
            ) : null}
          </>
        ))}
      </ClassCardsContainer>
    </LectureListContainer>
  );
}
