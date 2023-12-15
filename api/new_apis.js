import axios from "axios";

export async function getLecturesByContentId(contentId) {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_NEW_END_POINT}/lecture/${contentId}`,
    { withCredentials: true },
  );
  return data;
}
