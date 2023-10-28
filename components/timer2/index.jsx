import styled from "@emotion/styled";
import React, { useState, useEffect, useCallback } from "react";

const TextContainer = styled.div`
  background-color: #b034b9dd;
  width: 160px;
  margin: 10px 15px;
  padding: 5px 5px;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  z-index: 10;
  color: white;
  font-weight: 600;
  @media (max-width: 620px) {
    width: 100px;
    font-size: 10px;
    padding: 2px;
    margin: 5px 5px;
  }
`;
const TextTimer = styled.p``;

const Countdown2 = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const targetTime = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const timeDifference = targetTime - now;

    if (timeDifference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TextContainer>
      D - {timeLeft.days}일 {timeLeft.hours}시 {timeLeft.minutes}분{" "}
      {timeLeft.seconds}초
    </TextContainer>
  );
};

export default Countdown2;
