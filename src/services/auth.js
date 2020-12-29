import axios from "axios";

const baseUrl = "http://localhost:3000/auth";
const authService = axios.create({ baseUrl });

export const signup = async (user) => {
  await authService.post("/signup", user);
  return true;
};
