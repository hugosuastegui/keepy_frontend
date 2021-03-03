import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Context } from "../context";
import ConceptTable from "../components/ConceptTable";
import { Form, Input, DatePicker, Select, Button, Typography } from "antd";
import MY_SERVICES from "../services/index";

const { getAllConcepts, getSubaccounts, createConcept } = MY_SERVICES;
const { Title } = Typography;
const { Option } = Select;

function Ledger({ history }) {
  const { user, project } = useContext(Context);
  const [subaccountItems, setSubaccountItems] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [newConcepts, setNewConcepts] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchConcepts() {
      const {
        data: { concepts: fetchedConcepts },
      } = await getAllConcepts(project._id);
      setConcepts(fetchedConcepts);
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
    setNewConcepts([...newConcepts, newConcept]);
    form.resetFields();
  };

  const createAllConcepts = async (array) => {
    for (let i = 0; i < array.length; i++) {
      console.log("inside creator");
      await createConcept(project._id, array[i]);
    }
    setNewConcepts([]);
    // history.push("/brief");
  };

  const deleteConcept = (concept) => {
    console.log(`Delete concept with Id: ${concept.description}`);
  };

  return user ? (
    <div>
      <Title>Ledger</Title>
      <div className="ledgerButtons">
        <Button type="default" onClick={() => createAllConcepts(newConcepts)}>
          Save Changes
        </Button>
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
                  {subaccountItems.map((subaccount) => (
                    <Option key={subaccount._id} value={subaccount.name}>
                      {subaccount.name}
                    </Option>
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
          <ConceptTable concepts={concepts} deleteAction={deleteConcept} />
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}

export default Ledger;
