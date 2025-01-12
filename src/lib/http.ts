import axios from 'axios';

export type HttpResponse<TData> = {
  data: TData;
  statusCode: number;
  success: boolean;
};

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {http};