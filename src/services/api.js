import axios from "axios";
// import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8002",
  withCredentials: true,// csrf atack <<<<<<<<<<<
});

// INTERCEPTORS FOR XSS ATACK SIMULATION
// api.interceptors.request.use(async (config) => {
//   const token = getToken();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

//
// const getCookies = () =>
//   document.cookie.split(';').reduce((cookies, item) => {
//     const [name, value] = item.split('=');
//     cookies[name] = value;
//     return cookies;
//   }, {});

api.interceptors.request.use(async (config) => {
  // console.log(document.cookie)
  // const xsrfToken = getCookies();
  // CSRF Token.
  // console.log(xsrfToken)
  // if (xsrfToken) config.headers['authcookie'] = xsrfToken;
  config.headers["authcookie"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE2MTI4Mzg2NzN9.hzsDucCC5fmRLbs8FnCMre_yN9mTweV_x6igjOS2g7w";
  return config;
});

export default api;
