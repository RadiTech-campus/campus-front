import { useQuery } from "@tanstack/react-query";
import { getLecturesByContentId } from "../../api/new_apis";

export const useGetLecturesByContentId = (contentId) => {
  return useQuery({
    queryKey: ["lectures", contentId],
    queryFn: async () => {
      const data = await getLecturesByContentId(contentId);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};
