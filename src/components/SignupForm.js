import { React } from "react";
import { Form, Input, Button } from "antd";

function SignupForm() {
  const [form] = Form.useForm();

  async function onFinish(values) {
    // await signup(values)
    // history.push("/login")
  }

  return (
    <div>
      <Form layout="vertical" form={form} onFinish={onFinish}>
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
          label="Repeted Password"
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
    </div>
  );
}

export default SignupForm;
