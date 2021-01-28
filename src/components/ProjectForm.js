import React from "react";
import { Form, Input, Button } from "antd";
import MY_SERVICES from "../services/index";

const { createProject } = MY_SERVICES;

function ProjectForm({ initial, toggle }) {
  const [form] = Form.useForm();

  const onFinishProjectForm = async (values) => {
    await createProject(values);
    form.resetFields();
    toggle(false);
  };

  return (
    <Form
      initialValues={initial}
      name="projectForm"
      form={form}
      layout="vertical"
      onFinish={onFinishProjectForm}
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ProjectForm;
