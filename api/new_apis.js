import axios from "axios";

export async function getLecturesByContentId(contentId) {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_NEW_END_POINT}/lecture/list/${contentId}`,
    { withCredentials: true },
  );
  return data;
}

export async function getLectureById(lectureId) {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_NEW_END_POINT}/lecture/${lectureId}`,
    { withCredentials: true },
  );
  return data;
}

export async function getLectureDetailByLectureId(lectureId) {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_NEW_END_POINT}/lecturedetail/list/${lectureId}`,
    { withCredentials: true },
  );
  return data;
}
