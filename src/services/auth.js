import axios from "axios";

const baseURL = "http://localhost:3000/auth";
const authService = axios.create({ baseURL });

export const signup = async (user) => {
  await authService.post("/signup", user);
  return true;
};

export const login = async (user) => {
  const { data } = await authService.post("/login", user);
  return data;
};
