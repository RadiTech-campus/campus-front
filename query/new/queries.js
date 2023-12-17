import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAPayment,
  getAllProducts,
  getLatestPayment,
  getLectureAuthByUserIdAndLectureId,
  getLectureById,
  getLectureDetailByLectureId,
  getLecturesByContentId,
} from "../../api/new_apis";

export function useCreateAPayment(userId, productId) {
  const queryClient = useQueryClient();

  return useMutation(() => createAPayment(userId, productId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["payment"]);
    },
    onError: (e) => {
      console.log("e", e);
    },
    onSettled(data, error, variables, context) {
      console.log("data", data);
      console.log("error", error);
      console.log("variables", variables);
      console.log("context", context);
    },
  });
}

export const useGetLatestPayment = (userId) => {
  return useQuery({
    queryKey: ["payment", userId],
    queryFn: async () => {
      const data = await getLatestPayment(userId);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
    enabled: !!userId,
  });
};
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

export const useGetAllProduct = () => {
  return useQuery({
    queryKey: ["newproducts"],
    queryFn: async () => {
      const data = await getAllProducts();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};
