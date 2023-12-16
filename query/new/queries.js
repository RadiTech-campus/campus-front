import { useQuery } from "@tanstack/react-query";
import {
  getLectureAuthByUserIdAndLectureId,
  getLectureById,
  getLectureDetailByLectureId,
  getLecturesByContentId,
} from "../../api/new_apis";

export const useGetLectureAuthByUserIdAndLectureId = (userId, contentId) => {
  return useQuery({
    queryKey: ["payment", userId, contentId],
    queryFn: async () => {
      const data = await getLectureAuthByUserIdAndLectureId(userId, contentId);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
    enabled: !!userId && !!contentId,
  });
};
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

export const useGetLectureById = (lectureId) => {
  return useQuery({
    queryKey: ["lecture", lectureId],
    queryFn: async () => {
      const data = await getLectureById(lectureId);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetLectureDetailByLecturetId = (lectureId) => {
  return useQuery({
    queryKey: ["lectureDetail", lectureId],
    queryFn: async () => {
      const data = await getLectureDetailByLectureId(lectureId);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};
