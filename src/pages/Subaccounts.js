import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import MY_SERVICES from "../services/index";
import { Form, Input, Radio, Button, Typography } from "antd";

const { getSubaccounts } = MY_SERVICES;
const { Title } = Typography;

function Subaccounts() {
  const [items, setItems] = useState([]);
  const { user, project } = useContext(Context);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchSubaccounts() {
      const { subaccounts } = await getSubaccounts(project._id);
      console.log(subaccounts);
      setItems(subaccounts);
    }
    fetchSubaccounts();
  }, []);

  const createSubaccount = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Title>Subaccounts</Title>
      <p>
        Subaccounts are ways to classify concepts by type. Ever wondered how
        much money does an item accounts for in your total Revenue? Create a
        Subaccount for that item so you can handle its metrics on the Brief
        section!
      </p>
      <Form
        name="projectForm"
        form={form}
        layout="vertical"
        onFinish={createSubaccount}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input your project's name" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Account"
          name="account"
          rules={[
            { required: true, message: "Please input your project's name" },
          ]}
        >
          <Radio.Group>
            <Radio style={{ display: "block" }} value={"Revenue"}>
              Revenue
            </Radio>
            <Radio style={{ display: "block" }} value={"COGS"}>
              COGS
            </Radio>
            <Radio style={{ display: "block" }} value={"SG&A"}>
              SG&A
            </Radio>
            <Radio style={{ display: "block" }} value={"Taxes"}>
              Taxes
            </Radio>
            <Radio style={{ display: "block" }} value={"CapEx"}>
              CapEx
            </Radio>
          </Radio.Group>
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

export default Subaccounts;
