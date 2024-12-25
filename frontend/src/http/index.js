import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const $host = axios.create({
  baseURL: apiUrl,
});

const $authHost = axios.create({
  baseURL: apiUrl,
});

const authInterceptor = (config) => {
  const localConfig = config;
  localConfig.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return localConfig;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
