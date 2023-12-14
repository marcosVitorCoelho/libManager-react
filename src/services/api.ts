import axios, { AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";
import SessionConstants from "../constants/SessionConstants";

axios.defaults.headers["Content-Type"] = "application/json";

declare module "axios" {
  export interface AxiosInstance {
    request<T>(config: AxiosRequestConfig): Promise<T>;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig | any
    ): Promise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}

export const buildAxios = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.request.use(async (config) => {
    try {
      const newCookies = new Cookies();
      const token = newCookies.get(SessionConstants.ACCESS_TOKEN_COOKIE_KEY);
      if (token) {
        config.headers.Authorization = `bearer ${token}`;
      } else {
        return config;
      }
    } catch (error) {
      console.log(error);
    }

    return config;
  });

  return axiosInstance;
};

console.log(process.env);

export const apiBase = buildAxios({
  baseURL: process.env.baseAPI,
});
