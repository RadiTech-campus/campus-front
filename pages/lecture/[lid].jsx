import React from "react";
import { useRouter } from "next/router";
import LectureDetail from "../../components/lecturedetail";
import FreeLectureDetail from "../../components/lecturedetail/freeLectureDetail";
import PeriodLectureDetail from "../../components/lecturedetail/periodLectureDetail";

export default function Lecture() {
  const router = useRouter();

  const { lid } = router.query;

  return lid?.includes("F") ? (
    <FreeLectureDetail />
  ) : lid?.includes("Q") ? (
    <PeriodLectureDetail />
  ) : (
    <LectureDetail />
  );
}
