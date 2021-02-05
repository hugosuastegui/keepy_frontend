import React from "react";
import { Card } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SelectOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

function ProjectCard({ project, index, history }) {
  return (
    <Card
      style={{ width: 300, margin: "10px" }}
      key={index}
      actions={[
        <EditOutlined
          key="edit"
          onClick={history.push(`/projects/${project.id}`)}
        />,
        <DeleteOutlined key="setting" />,
        <SelectOutlined key="select" />,
      ]}
    >
      <Meta title={project.name} description={project.description} />
    </Card>
  );
}

export default ProjectCard;
