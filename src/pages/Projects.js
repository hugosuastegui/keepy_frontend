import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Context } from "../context";

// Components in page
import ProjectCard from "../components/ProjectCard";

// Services in page

import { getCurrentUser } from "../services/auth";

function Projects() {
  const { user } = useContext(Context);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { projects },
        },
      } = await getCurrentUser();
      console.log(projects);
      setProjectsList(projects);
      console.log(projectsList);
    }
    fetchInfo();
  }, []);

  return user ? (
    <div>
      <h1 style={{ display: "inline" }}>Welcome {user.username}</h1>
      <br />
      <br />
      <div>
        {projectsList.length !== 0 ? (
          projectsList.map((project, ind) => (
            <ProjectCard key={ind} project={project} index={ind}></ProjectCard>
          ))
        ) : (
          <p>
            No projects to show yet, start off by creating a{" "}
            <Link to="/projects/new">New Project</Link>
          </p>
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Projects;
