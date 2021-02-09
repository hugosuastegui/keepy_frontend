import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Typography } from "antd";
import { Context } from "../context";

// Components in page
import ProjectCard from "../components/ProjectCard";

// Services in page

import { getCurrentUser } from "../services/auth";

const { Title } = Typography;

function Projects({ history }) {
  const { user } = useContext(Context);
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

  return user ? (
    <div>
      <Title>Projects List</Title>
      <Button type="primary">
        <Link to="/projects/new">New project</Link>
      </Button>
      <br />
      <br />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {projectsList.length !== 0 ? (
          projectsList.map((project, ind) => (
            <ProjectCard
              key={ind}
              project={project}
              index={ind}
              history={history}
            ></ProjectCard>
          ))
        ) : (
          <p>No projects to show yet, start off by creating a new one</p>
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Projects;
