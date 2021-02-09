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

  createProject: async (project) => {
    return await service.post("/projects", project);
  },
  getProjects: async () => {
    return await service.get("/projects");
  },
  getProject: async (projectId) => {
    return await service.get(`/projects/${projectId}`);
  },
  updateProject: async (projectId, project) => {
    return await service.put(`/projects/${projectId}`, project);
  },
  deleteProject: async (projectId) => {
    return await service.delete(`/projects/${projectId}`);
  },
};

export default MY_SERVICES;
