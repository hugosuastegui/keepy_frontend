import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import { Redirect, Link } from "react-router-dom";
import { Button, Card, Typography } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SelectOutlined,
} from "@ant-design/icons";

// Services in page
import MY_SERVICES from "../services/index";
import { getCurrentUser } from "../services/auth";

const { deleteProject } = MY_SERVICES;

const { Meta } = Card;
const { Title } = Typography;

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
    console.log(`Selected project: ${project.name}`);
    // setCtxProject(project);
  };

  const eraseProject = async (project, ind) => {
    console.log(`Project to be deleted is ${project._id}, ${project.name}`);
    await deleteProject(project._id);
    const newProjectsList = projectsList.slice(ind);
    console.log(newProjectsList);
    // setProjectsList(newProjectsList);
  };

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
            <Card
              style={{ width: 300, margin: "10px" }}
              key={ind}
              actions={[
                <EditOutlined key="edit" onClick={() => editButton(project)} />,
                <DeleteOutlined
                  key="setting"
                  onClick={() => eraseProject(project, ind)}
                />,
                <SelectOutlined
                  key="select"
                  onClick={() => selectProject(project)}
                />,
              ]}
            >
              <Meta title={project.name} description={project.description} />
            </Card>
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
