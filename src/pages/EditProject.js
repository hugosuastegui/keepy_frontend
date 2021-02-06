import React, { useState, useEffect } from "react";
import { Typography, Form } from "antd";
import ProjectForm from "../components/ProjectForm";
import MY_SERVICES from "../services";

const { getProject } = MY_SERVICES;
const { Title } = Typography;

function EditProject({
  match: {
    params: { projectId },
  },
  history,
}) {
  const [projectItem, setProjectItem] = useState(null);

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: { project },
      } = await getProject(projectId);
      console.log(project);
      setProjectItem(project);
      console.log(projectItem);
    }
    fetchInfo();
  }, []);

  return (
    projectItem && (
      <div>
        <Title>Edit</Title>
        <Title level={2}>{projectItem.name}</Title>
        <br />
        <ProjectForm history={history} initial={projectItem}></ProjectForm>
      </div>
    )
  );
}

export default EditProject;
