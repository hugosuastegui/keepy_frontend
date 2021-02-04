import React from "react";
import ProjectForm from "../components/ProjectForm";
import { Typography } from "antd";
const { Title } = Typography;

function NewProject({ history }) {
  return (
    <div>
      <Title>New Project</Title>
      <ProjectForm history={history}></ProjectForm>
    </div>
  );
}

export default NewProject;
