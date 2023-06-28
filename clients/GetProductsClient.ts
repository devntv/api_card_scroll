/* eslint-disable import/no-anonymous-default-export */
import { requestData } from "./clients";

const GetAllProductsClient = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data;
};
const GetPerPageProductsClient = async (
  limit: number,
  query: string | number = "f"
) => {
  const response = await requestData(
    `https://dummyjson.com/products/search?q=${query}&limit=${limit}`,
    "GET"
  );
  return response;
};

const SearchProductQuery = async (query: string) => {
  const response = await requestData(
    `https://dummyjson.com/products/search?q=${query}`,
    "GET"
  );
  return response;
};

export default {
  GetAllProductsClient,
  GetPerPageProductsClient,
  SearchProductQuery,
};
