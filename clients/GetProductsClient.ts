/* eslint-disable import/no-anonymous-default-export */
import { getProducts, requestData } from "./clients";

const GetAllProductsClient = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data;
};
const GetPerPageProductsClient = async (limit: number) => {
  const response = await requestData(
    `https://dummyjson.com/products?limit=${limit}`,
    "GET"
  );
  return getProducts(response);
};

export default {
  GetAllProductsClient,
  GetPerPageProductsClient,
};
