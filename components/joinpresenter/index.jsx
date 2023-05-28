import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import SignUpModal from "../modal/SignUpModal";
import ServiceModal from "../modal/ServiceModal";
import PrivacyModal from "../modal/PrivacyModal";

const JoinPresenterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function JoinPresenter({ allCheck, setAllCheck }) {
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };

  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);
  //
  const [isOpenConfirmSignUp, setIsOpenConfirmSignUp] = useState(false);
  const [isOpenConfirmSignUp2, setIsOpenConfirmSignUp2] = useState(false);

  const setConfirmSignUp = () => {
    setIsOpenConfirmSignUp(true);
  };
  const setConfirmSignUp2 = () => {
    setIsOpenConfirmSignUp2(true);
  };
  return (
    <JoinPresenterContainer>
      {isOpenConfirmSignUp && (
        <ServiceModal
          open={isOpenConfirmSignUp}
          onClose={() => {
            setIsOpenConfirmSignUp(false);
          }}
        />
      )}
      {isOpenConfirmSignUp2 && (
        <PrivacyModal
          open={isOpenConfirmSignUp2}
          onClose={() => {
            setIsOpenConfirmSignUp2(false);
          }}
        />
      )}
      <label>약관동의</label>
      <div>
        <div>
          <input
            type="checkbox"
            id="all-check"
            checked={allCheck}
            onChange={allBtnEvent}
          />
          <label for="all-check">전체동의</label>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <input
                type="checkbox"
                id="check2"
                checked={useCheck}
                onChange={useBtnEvent}
              />
              <label for="check2">
                서비스 이용약관 동의 <span>(필수)</span>{" "}
              </label>
            </div>
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => setConfirmSignUp()}
            >
              보기
            </span>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <input
                type="checkbox"
                id="check3"
                checked={marketingCheck}
                onChange={marketingBtnEvent}
              />
              <label for="check3">
                개인정보 수집 및 이용 동의 <span>(필수)</span>{" "}
              </label>
            </div>
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => setConfirmSignUp2()}
            >
              보기
            </span>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="check1"
            checked={ageCheck}
            onChange={ageBtnEvent}
          />
          <label for="check1">
            만 14세 이상입니다 <span>(필수)</span>
          </label>
        </div>
      </div>
    </JoinPresenterContainer>
  );
}

export default JoinPresenter;
