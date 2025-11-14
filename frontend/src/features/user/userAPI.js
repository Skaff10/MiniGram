import axios from "axios";

const API_URL = "/api/users/";

const register = async (userData) => {
  const res = await axios.post(API_URL + "signup", userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));

  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));

  return res.data;
};

const logout = () => localStorage.removeItem("user");

const uploadDP = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(API_URL + "upload", userData, config);
  return res.data;
};

const getUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL + "getuser/" + id, config);

  return res.data;
};

const userAPI = {
  register,
  login,
  logout,
  uploadDP,
  getUser,
};

export default userAPI;
