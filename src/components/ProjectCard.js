import React, { useContext } from "react";
import { Context } from "../context";
import MY_SERVICES from "../services/index";
import { Card } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SelectOutlined,
} from "@ant-design/icons";

const { deleteProject } = MY_SERVICES;
const { Meta } = Card;

function ProjectCard({ project, index, history }) {
  const { setCtxProject } = useContext(Context);
  const editButton = async () => {
    history.push(`/projects/${project._id}`);
  };
  const selectProject = async () => {
    console.log(`Selected project: ${project.name}`);
    // setCtxProject(project);
  };
  const deleteProject = async () => {
    console.log(`Project to be deleted is ${project.name}`);
    // await deleteProject(project);
  };

  return (
    <Card
      style={{ width: 300, margin: "10px" }}
      key={index}
      actions={[
        <EditOutlined key="edit" onClick={() => editButton()} />,
        <DeleteOutlined key="setting" onClick={() => deleteProject()} />,
        <SelectOutlined key="select" onClick={() => selectProject()} />,
      ]}
    >
      <Meta title={project.name} description={project.description} />
    </Card>
  );
}

export default ProjectCard;
