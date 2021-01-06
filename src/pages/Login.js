import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { login } from "../services/auth";

const { Text } = Typography;

function Login({ history }) {
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  async function onFinish(values) {
    await login(values).catch((err) => {
      setError(err);
    });
    // history.push("/projects");
  }

  return (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
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

      {error && <Text type="danger">{error.message}</Text>}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
