import styled from "@emotion/styled";
import React, { useState, useEffect, useCallback } from "react";

const TextContainer = styled.div`
  background-color: #b034b9dd;
  /* width: 130px; */
  margin: 10px 15px;
  padding: 5px 8px;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  z-index: 10;
  color: white;
  font-weight: 600;
  @media (max-width: 650px) {
    /* width: 85px; */
    font-size: 11px;
    padding: 3px 6px;
    margin: 5px 5px;
  }
`;
// const TextTimer = styled.p``;

const Countdown = ({ targetDate, endDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const targetTime = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const timeDifference = targetTime - now;

    // if (!isNaN(start) && !isNaN(end)) {
    //   setIsPeriod(currentDate >= start && currentDate <= end);
    // } else {
    //   setIsPeriod(false);
    // }

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
  const calculateEndTimeLeft = useCallback(() => {
    const targetTime = new Date(endDate).getTime();
    const now = new Date().getTime();
    const timeDifference = targetTime - now;

    // if (!isNaN(start) && !isNaN(end)) {
    //   setIsPeriod(currentDate >= start && currentDate <= end);
    // } else {
    //   setIsPeriod(false);
    // }

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

  const end = new Date() > new Date(endDate);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [endTimeLeft, setEndTimeLeft] = useState(calculateEndTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const endTimer = setInterval(() => {
      setEndTimeLeft(calculateEndTimeLeft());
    }, 1000);

    return () => clearInterval(endTimer);
  }, []);
  return (
    <TextContainer>
      {endTimeLeft.days === 0 &&
      endTimeLeft.hours === 0 &&
      endTimeLeft.minutes === 0 &&
      endTimeLeft.seconds === 0 ? (
        <div>종료</div>
      ) : endTimeLeft.days === 0 &&
        endTimeLeft.hours <= 1 &&
        endTimeLeft.minutes <= 59 &&
        endTimeLeft.seconds <= 59 ? (
        <div>강의중</div>
      ) : timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0 ? (
        <div>D-day</div>
      ) : (
        <div>D - {timeLeft.days}</div>
      )}
    </TextContainer>
  );
};

export default Countdown;
