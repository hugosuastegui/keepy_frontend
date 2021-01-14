import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { login } from "../services/auth";
import { Context } from "../context";

function Login({ history }) {
  const [form] = Form.useForm();
  const { loginUser, user } = useContext(Context);

  async function onFinish(values) {
    const user = await login(values).catch((err) => {
      openNotificationWithIcon(err.response.data.message);
    });
    delete user.password;
    loginUser(user);
  }

  const openNotificationWithIcon = (message) => {
    notification.error({
      message: "Bad login",
      description: message,
    });
  };

  return !user ? (
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <Redirect to="/profile" />
  );
}

export default Login;
