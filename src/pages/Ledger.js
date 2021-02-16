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
    const newConcept = {
      description: values.description,
      day: values.date.format("DD"),
      month: values.date.format("MMM"),
      year: values.date.format("YYYY"),
      amount: values.amount,
      subaccount: values.subaccount,
    };
    setConcepts([...concepts, newConcept]);
    form.resetFields();
  };

  return user ? (
    <div>
      <Title>Ledger</Title>
      <div className="ledgerButtons">
        <Button type="default">Save Changes</Button>
        <Button type="default">
          <Link to={`/subaccounts`}>Subaccounts</Link>
        </Button>
      </div>
      <br />
      <br />
      <div className="ledgerContent">
        {project ? (
          <>
            {project.subaccounts.length === 0 ? (
              <p>
                Before you can add any concept yo have to first add Subaccounts
              </p>
            ) : (
              <></>
            )}
            <Form
              name="concept-form"
              form={form}
              layout="inline"
              onFinish={addConcept}
            >
              <Form.Item name="description" label="Concept">
                <Input size="medium" placeholder="Description"></Input>
              </Form.Item>
              <Form.Item name="date">
                <DatePicker />
              </Form.Item>
              <Form.Item name="amount">
                <Input size="medium" placeholder="Amount"></Input>
              </Form.Item>
              <Form.Item name="subaccount">
                <Select placeholder="Subaccount">
                  {subaccountItems.map((subaccount, ind) => (
                    <Option key={subaccount.name}>{subaccount.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <br />
            <br />
          </>
        ) : (
          <p>First you have to select a project from the Projects Menu</p>
        )}
        {concepts.length === 0 ? (
          <p>No concepts to show yet</p>
        ) : (
          <table className="concept">
            <tr>
              <th>Subaccount</th>
              <th>Day</th>
              <th>Month</th>
              <th>Year</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
            {concepts.map((concept, ind) => (
              <tr key={ind}>
                <td>{concept.subaccount}</td>
                <td>{concept.day}</td>
                <td>{concept.month}</td>
                <td>{concept.year}</td>
                <td>{concept.description}</td>
                <td>{concept.amount}</td>
                <td>Balance</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}

export default Ledger;
