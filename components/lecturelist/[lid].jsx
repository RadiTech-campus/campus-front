import React from "react";
import { useRouter } from "next/router";

export default function LectureList() {
  const router = useRouter();
  const { lid } = router.query;
  return <div>LectureDetail{lid}</div>;
}
