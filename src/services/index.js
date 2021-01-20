import axios from "axios";

const baseURL = "http://localhost:3000/";
const service = axios.create({
  baseURL,
  withCredentials: true,
});
// Nosotros vamos a mandar las credenciales siempre que utilicemos al usuario en sesion o querramos utilizar la sesion

const MY_SERVICES = {
  updateUser: async (userId, user) => {
    return await service.put(`/users/${userId}`, user);
  },
};

export default MY_SERVICES;
