import axios from "axios";

const API_URL = "http://localhost:5000/v1/auth/";

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
