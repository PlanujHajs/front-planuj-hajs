import axios, { AxiosRequestConfig } from 'axios';

const token = import.meta.env.VITE_API_TOKEN as string;

export const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
     Authorization: `Bearer ${token}`,
  },
});

export const axiosCustom = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {

  const response = await AXIOS_INSTANCE({
    ...config,
    ...options,
  });

  return response.data as T;
};

