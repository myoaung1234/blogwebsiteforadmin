import axios from "axios";
import { apiURL } from "../config/axios";

const API_URL = `${apiURL}/auth/`;

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password
    })
    .then((response) => {
      if (response.data.tokens) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
