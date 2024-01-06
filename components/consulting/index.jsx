import styled from "@emotion/styled";
import React from "react";

const ConsultingContainer = styled.div``;

const ConsultingContent = styled.div`
  @media (max-width: 650px) {
    border: 1px solid #b5b5b5;
    margin: 20px;
    padding: 80px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: #666666;
  }
  border: 1px solid #b5b5b5;
  margin: 20px;
  padding: 80px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #666666;
`;

const ConsultingContentText = styled.div`
  @media (max-width: 650px) {
    margin-bottom: 2px;
    font-size: 4vw;
  }
  margin-bottom: 2px;
  font-size: 1.5vw;
`;

const UploadButton = styled.button`
  @media (max-width: 650px) {
    background-color: #e96962;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-weight: 600;
    font-size: 3.5vw;
  }
  background-color: #e96962;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 1.5vw;
`;
const DownloadButton = styled.button`
  @media (max-width: 650px) {
    background-color: #b5b5b5;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-weight: 600;
    font-size: 3.5vw;
  }
  background-color: #b5b5b5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 1.5vw;
`;

export default function Consulting() {
  return (
    <ConsultingContainer>
      <ConsultingContent>
        <ConsultingContentText>컨설팅 받을</ConsultingContentText>
        <ConsultingContentText>
          자기소개서를 업로드 해주세요!
        </ConsultingContentText>
        <UploadButton>Upload</UploadButton>
      </ConsultingContent>
      <ConsultingContent>
        <ConsultingContentText>자소서 컨설팅은</ConsultingContentText>
        <ConsultingContentText>
          업로드 후 7일 안에 평가가 완료 됩니다.
        </ConsultingContentText>
        <DownloadButton>Download</DownloadButton>
      </ConsultingContent>
      <ConsultingContent>
        <ConsultingContentText>자기소개서 업로드가</ConsultingContentText>
        <ConsultingContentText>완료되었습니다</ConsultingContentText>
        <UploadButton>Upload</UploadButton>
      </ConsultingContent>
      <ConsultingContent>
        <ConsultingContentText>
          자소서 컨설팅이 완료되었습니다
        </ConsultingContentText>
        <ConsultingContentText>합격을 기원합니다</ConsultingContentText>
        <DownloadButton>Download</DownloadButton>
      </ConsultingContent>
    </ConsultingContainer>
  );
}
