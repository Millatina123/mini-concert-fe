// utils/auth.js

import Cookies from "js-cookie";

export const saveToken = (token) => {
  localStorage.setItem("authToken", token);
  Cookies.set("authToken", token);
};

export const saveUser = (user) => {
  localStorage.setItem("user", user);
  Cookies.set("user", user);
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const removeToken = () => {
  localStorage.removeItem("authToken");
};

export const isLoggedIn = () => {
  return !!getToken();
};
