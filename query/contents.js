import {
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CreatePayment,
  getAUniv,
  getContentDetail,
  getContents,
  getPayment,
  getPayments,
  getProduct,
  getProducts,
} from "../api/contents_api";

export const useGetContents = () => {
  return useQuery({
    queryKey: ["contents"],
    queryFn: async () => {
      const data = await getContents();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetContentDetails = (contentCode) => {
  return useQuery({
    queryKey: [contentCode],
    queryFn: async () => {
      const data = await getContentDetail(contentCode);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetPayment = (userId) => {
  return useQuery({
    queryKey: [userId],
    queryFn: async () => {
      const data = await getPayment(userId);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const data = await getPayments();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetAUniv = (domain) => {
  return useQuery({
    queryKey: [`${domain}`],
    queryFn: async () => {
      const data = await getAUniv(domain);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetProduct = (productCode) => {
  return useQuery({
    queryKey: [`${productCode}`],
    queryFn: async () => {
      const data = await getProduct(productCode);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await getProducts();
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
  });
};

export function useCreatePayment(paymentData) {
  // const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.

  return useMutation(() => CreatePayment(paymentData), {
    // useMutation훅은 첫번째 훅으로 데이터 페치 함수를 받는다. 그 후 성공했는 지 실패했는지에 따라 onSuccess, onError, onSettled를 제공한다.
    // onSuccess: () => {
    //   // useMutation과 궁합이 잘맞는 invalidateQueries이다.
    //   queryClient.invalidateQueries(["payments"]);
    // },
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
