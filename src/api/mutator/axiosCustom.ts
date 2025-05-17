import axios, { AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // @ts-ignore 
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const axiosCustom = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const response = await AXIOS_INSTANCE({
    ...config,
    ...options,
  });
  return response.data;
};