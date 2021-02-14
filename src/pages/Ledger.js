import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Context } from "../context";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Typography,
  InputNumber,
} from "antd";
import MY_SERVICES from "../services/index";

const { getAllConcepts, getSubaccounts } = MY_SERVICES;
const { Title } = Typography;
const { Option } = Select;

function Ledger() {
  const { user, project } = useContext(Context);
  const [subaccountItems, setSubaccountItems] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchConcepts() {
      const { data } = await getAllConcepts;
      console.log(data);
    }
    async function fetchSubaccounts() {
      const {
        data: { subaccounts },
      } = await getSubaccounts(project._id);
      setSubaccountItems(subaccounts);
    }
    fetchSubaccounts();
    fetchConcepts();
    return () => {
      return null;
    };
  }, [project]);

  const addConcept = (values) => {
    console.log(values);
  };

  return user ? (
    <div>
      <Title>Ledger</Title>
      {project ? (
        <>
          {project.subaccounts.length === 0 ? (
            <p>
              Before you can add any concept yo have to first add Subaccounts
            </p>
          ) : (
            <></>
          )}
          <Button type="default">
            <Link to={`/subaccounts`}>Subaccounts</Link>
          </Button>
          <br />
          <br />

          <Form
            name="concept-form"
            form={form}
            layout="inline"
            onFinish={addConcept}
          >
            <Form.Item name="description" label="Concept">
              <Input size="large" placeholder="Description"></Input>
            </Form.Item>
            <Form.Item name="date">
              <DatePicker />
            </Form.Item>
            <Form.Item name="amount">
              <InputNumber size="medium" placeholder="Amount"></InputNumber>
            </Form.Item>
            <Form.Item name="subaccount">
              <Select placeholder="Subaccount">
                {subaccountItems.map((subaccount, ind) => (
                  <Option key={ind}>{subaccount.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <p>First you have to select a project from the Projects Menu</p>
      )}
    </div>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}

export default Ledger;
