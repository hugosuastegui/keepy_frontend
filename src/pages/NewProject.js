import React from "react";
import ProjectForm from "../components/ProjectForm";
import { Typography } from "antd";
import MY_SERVICES from "../services/index";

const { createProject } = MY_SERVICES;
const { Title } = Typography;

function NewProject({ history }) {
  return (
    <div>
      <Title>New Project</Title>
      <ProjectForm history={history} action={createProject}></ProjectForm>
    </div>
  );
}

export default NewProject;
