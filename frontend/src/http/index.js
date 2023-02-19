import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  const localConfig = config;
  localConfig.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return localConfig;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
