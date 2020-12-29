import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { signup } from "../services/auth";

function Signup({ history }) {
  const [form] = Form.useForm();

  async function onFinish(values) {
    await signup(values);
    history.push("/login");
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

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
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
