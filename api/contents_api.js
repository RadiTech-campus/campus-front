import axios from "axios";

export async function getContents() {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_END_POINT}/content`,
  );
  return data;
}

export async function getContentDetail(contentCode) {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_END_POINT}/content/detail?contentCode=${contentCode}`,
  );
  return data;
}

export async function getPayment(userId) {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_END_POINT}/payment?userId=${userId}`,
  );
  return data;
}

export async function getPayments() {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_END_POINT}/payments`,
  );
  return data;
}

export async function getAUniv(domain) {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_END_POINT}/auniv?domain=${domain}`,
  );
  return data;
}

export async function getProduct(productCode) {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_END_POINT}/product?productCode=${productCode}`,
  );
  return data;
}

export async function getProducts() {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_END_POINT}/products`,
  );
  return data;
}

export async function CreatePayment(paymentData) {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_END_POINT}/payment`,
    paymentData,
  );
  return data;
}

// export async function CreateBulkProduct(
//   companyId: any,
//   productsdata: any,
// ): Promise<any> {
//   const headers = {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   };
//   const { data } = await axios.post(
//     `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/products/bulk`,
//     // `http://localhost:8080/${companyId}/products/bulk`,
//     JSON.stringify(productsdata),
//     { headers },
//   );
//   return data;
// }

// export async function CreateProduct(
//   companyId: any,
//   productdata: any,
// ): Promise<any> {
//   const headers = {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   };
//   const { data } = await axios.post(
//     `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/products`,
//     // `http://localhost:8080/${companyId}/products`,
//     JSON.stringify(productdata),
//     { headers },
//   );
//   return data;
// }
