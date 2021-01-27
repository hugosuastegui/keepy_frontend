import axios from "axios";

const baseURL = "http://localhost:3000/auth";
const authService = axios.create({
  baseURL,
  withCredentials: true,
});
// Nosotros vamos a mandar las credenciales siempre que utilicemos al usuario en sesion o querramos utilizar la sesion

export const signup = async (user) => {
  await authService.post("/signup", user);
  return true;
};

export const login = async (userData) => {
  const { data: user } = await authService.post("/login", userData);
  return user;
};

export const getCurrentUser = async () => {
  return await authService.get("/currentuser");
};

export const logout = async () => {
  await authService.get("/logout");
};

export const updateProfilePhoto = async (photo) => {
  await authService.put("/photo", { photo });
};
