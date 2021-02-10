import React, { useContext } from "react";
import Context from "../context";
import { Redirect } from "react-router-dom";
import { Form, Input, Select, Option, Button, Typography } from "antd";
import MY_SERVICES from "../services/index";

const { createProject } = MY_SERVICES;
const { Title } = Typography;

function NewProject({ history }) {
  const { user } = useContext(Context);
  const [form] = Form.useForm();

  const newProject = async (values) => {
    console.log(values);
    await createProject(values);
    history.push("/projects");
  };

  return user ? (
    <div>
      <Title>New Project</Title>
      <Form
        initialValues={null}
        name="projectForm"
        form={form}
        layout="vertical"
        onFinish={newProject}
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
  ) : (
    <Redirect to="/login"></Redirect>
  );
}

export default NewProject;
