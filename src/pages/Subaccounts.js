import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import MY_SERVICES from "../services/index";
import { Form, Input, Radio, Button, Typography, Tag } from "antd";

const { getSubaccounts, createSubaccount } = MY_SERVICES;
const { Title } = Typography;

function Subaccounts({ history }) {
  const [items, setItems] = useState([]);
  const [itemsToCreate, setitemsToCreate] = useState([]);
  const { project } = useContext(Context);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchSubaccounts() {
      const {
        data: { subaccounts },
      } = await getSubaccounts(project._id);
      if (subaccounts !== undefined) {
        setItems(subaccounts);
      }
    }
    fetchSubaccounts();
  }, [project]);

  const addSubaccount = (values) => {
    const array = itemsToCreate;
    array.push({ ...values, project: project._id });
    setitemsToCreate(array);
    setItems([...items, values]);
    form.resetFields();
  };

  const createAllsubaccounts = async (array) => {
    for (let i = 0; i < array.length; i++) {
      await createSubaccount(array[i], project._id);
    }
    setitemsToCreate([]);
    history.goBack();
  };

  return (
    <div className="subaccountWindow">
      <Title>Subaccounts</Title>
      <p>
        Subaccounts are ways to classify concepts by type. Ever wondered how
        much money does an item accounts for in your total Revenue? Create a
        Subaccount for that item so you can handle its metrics on the Brief
        section!
      </p>
      <div className="rowContent">
        <Form
          name="projectForm"
          form={form}
          layout="vertical"
          onFinish={addSubaccount}
          style={{ margin: "1rem" }}
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
              <Radio style={{ display: "block" }} value={"Dividends"}>
                Dividends
              </Radio>
              <Radio style={{ display: "block" }} value={"Retained Earnings"}>
                Retained Earnings
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="secondary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
        <div>
          <Title level={5}>Existing subaccounts</Title>
          <div className="tagBox">
            {items.length !== 0 ? (
              items.map((tag, ind) => (
                <Tag key={ind} style={{ margin: "5px" }}>
                  {tag.name}
                </Tag>
              ))
            ) : (
              <p>No subaccounts created yet</p>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
      <Button
        type="primary"
        onClick={() => createAllsubaccounts(itemsToCreate)}
      >
        Save Changes
      </Button>
    </div>
  );
}

export default Subaccounts;
