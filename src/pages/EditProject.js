import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import ProjectForm from "../components/ProjectForm";
import MY_SERVICES from "../services";

const { getProject, updateProject } = MY_SERVICES;
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
      setProjectItem(project);
    }
    fetchInfo();
  }, []);

  return (
    projectItem && (
      <div>
        <Title>Edit</Title>
        <Title level={2}>{projectItem.name}</Title>
        <br />
        <ProjectForm
          history={history}
          initial={projectItem}
          action={updateProject}
        ></ProjectForm>
      </div>
    )
  );
}

export default EditProject;
