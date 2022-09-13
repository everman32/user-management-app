import jwt_decode from "jwt-decode";
import { $authHost, $host } from "./index";

export const singUp = async (name, email, password) => {
  const { data } = await $host.post("api/user/singUp", {
    name,
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const singIn = async (email, password) => {
  const { data } = await $host.post("api/user/singIn", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const getToken = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const getAll = async () => {
  const { data } = await $host.get("api/user/getAll");
  return data;
};
export const deleteById = async (id) => {
  const { data } = await $host.post("api/user/delete", { id });
  return data;
};

export const blockById = async (id) => {
  const { data } = await $host.post("api/user/block", { id });
  return data;
};

export const activateById = async (id) => {
  const { data } = await $host.post("api/user/activate", { id });
  return data;
};
