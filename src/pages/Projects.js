import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import { Redirect, Link } from "react-router-dom";

// Services in page
import MY_SERVICES from "../services/index";
import { getCurrentUser } from "../services/auth";

const { deleteProject } = MY_SERVICES;

function Projects({ history }) {
  const { user, setCtxProject } = useContext(Context);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { projects },
        },
      } = await getCurrentUser();
      setProjectsList(projects);
    }
    fetchInfo();
    return null;
  }, []);

  const editButton = async (project) => {
    history.push(`/projects/${project._id}`);
  };

  const selectProject = async (project) => {
    setCtxProject(project);
  };

  const eraseProject = async (project, index) => {
    console.log(`Project to be deleted is ${project._id}, ${project.name}`);
    await deleteProject(project._id);
    const newProjectsList = projectsList.filter((el, ind) => ind !== index);
    setProjectsList(newProjectsList);
  };

  return user ? (
    <div className="projectsPage">
      <h1>My Projects</h1>
      <button className="primaryButton mainButton">
        <Link to="/projects/new">New project</Link>
      </button>
      <br />
      <div className="projectList">
        {projectsList.length !== 0 ? (
          projectsList.map((project, ind) => (
            <div
              className="projectCard"
              key={ind}
              onClick={() => selectProject(project)}
            >
              <div className="projectCardText">
                <h4>{project.name}</h4>
                <p>{project.description}</p>
              </div>
              <div className="projectCardActions">
                <button
                  className="primaryButton"
                  onClick={() => editButton(project)}
                >
                  Edit
                </button>
                <button
                  className="primaryButton"
                  onClick={() => eraseProject(project, ind)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No projects to show yet, start off by creating a new one</p>
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Projects;
