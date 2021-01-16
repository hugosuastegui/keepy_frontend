import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { signup } from "../services/auth";

const { Title } = Typography;

function Signup({ history }) {
  const [form] = Form.useForm();

  async function onFinish(values) {
    await signup(values);
    history.push("/projects");
  }

  return (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title>Sign Up</Title>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Repeated Password"
        name="repeatedPassword"
        rules={[{ required: true, message: "Please repeat your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Signup;
