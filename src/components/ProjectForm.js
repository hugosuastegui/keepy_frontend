import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import { Context } from "../context";

const { Option } = Select;

function ProjectForm({ history, initial, action }) {
  const { user } = useContext(Context);
  const [form] = Form.useForm();

  const onFinishProjectForm = async (values) => {
    await action(values);
    history.push("/projects");
  };

  return user ? (
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

      <Form.Item label="Category" name="category" rules={[{ required: true }]}>
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
  ) : (
    <Redirect to="/projects"></Redirect>
  );
}

export default ProjectForm;
