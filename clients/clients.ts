interface Response {
  data: any[];
}
interface Products {
  limit: number;
  products: any[];
  total: number;
}

export function getProducts(resp: Products, def = null) {
  return resp && resp.products.length > 0 ? resp.products : def;
}

export function getData(resp: Response, def = []) {
  return resp ? resp.data : def;
}

export const requestData = async (url: string, method: string, body?: any) => {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};
