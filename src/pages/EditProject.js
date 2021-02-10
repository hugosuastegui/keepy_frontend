import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Typography } from "antd";
import MY_SERVICES from "../services";

const { getProject, updateProject } = MY_SERVICES;
const { Title } = Typography;
const { Option } = Select;

function EditProject({
  match: {
    params: { projectId },
  },
  history,
}) {
  const [projectItem, setProjectItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: { project },
      } = await getProject(projectId);
      setProjectItem(project);
    }
    fetchInfo();
  }, []);

  const editProject = async (values) => {
    console.log(projectId, values);
    await updateProject(projectId, values);
    history.push("/projects");
  };

  return (
    projectItem && (
      <div>
        <Title>Edit</Title>
        <Title level={2}>{projectItem.name}</Title>
        <br />
        <Form
          initialValues={projectItem}
          name="projectForm"
          form={form}
          layout="vertical"
          onFinish={editProject}
        >
          <Form.Item
            label="Project's Name"
            name="name"
            rules={[
              { required: true, message: "Please input your project's name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your project's description",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true }]}
          >
            <Select style={{ width: "100%" }} placeholder="Please select">
              <Option key={"business"}>Business</Option>
              <Option key={"project"}>Project</Option>,
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  );
}

export default EditProject;
