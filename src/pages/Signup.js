import React, { useContext } from "react";
import { Form, Input, Button, Typography } from "antd";
import { signup, login } from "../services/auth";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../context";

const { Title } = Typography;

function Signup({ history }) {
  const { user, loginUser } = useContext(Context);
  const [form] = Form.useForm();

  async function signupProcess(values) {
    console.log(values);
    await signup(values);
    const {
      data: { user },
    } = await login(values);
    delete user.password;
    delete user.hash;
    delete user.salt;
    loginUser(user);
    history.push("/projects");
  }

  return !user ? (
    <>
      <Form
        layout="vertical"
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={signupProcess}
      >
        <Title>Sign Up</Title>
        <Form.Item
          label="username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
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
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  ) : (
    <Redirect to="/projects"></Redirect>
  );
}

export default Signup;
