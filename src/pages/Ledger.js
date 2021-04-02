import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Context } from "../context";
import ConceptTable from "../components/ConceptTable";
import { Form, Input, DatePicker, Select, Button } from "antd";

import MY_SERVICES from "../services/index";

const { getAllConcepts, getSubaccounts, createConcept } = MY_SERVICES;
const { Option } = Select;

function Ledger({ history }) {
  const [newConcepts, setNewConcepts] = useState([]);
  const { user, project } = useContext(Context);
  const [subaccountItems, setSubaccountItems] = useState([]);
  const [concepts, setConcepts] = useState([]);
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
      amount: parseInt(values.amount, 10),
      subaccount: { name: values.subaccount },
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
    history.push("/ledger");
  };

  const deleteConcept = (concept) => {
    console.log(`Delete concept with Id: ${concept.description}`);
  };

  return user ? (
    <div className="ledgerPage">
      <h1>Ledger</h1>
      <div className="ledgerButtons">
        <button
          className={
            newConcepts.length !== 0
              ? "primaryButton mainButton"
              : "secButton mainButton"
          }
          onClick={() => createAllConcepts(newConcepts)}
          disabled={newConcepts.length === 0 ? true : false}
        >
          Save Changes
        </button>
        <button className="secButton mainButton">
          <Link to={`/subaccounts`}>Subaccounts</Link>
        </button>
      </div>
      <br />
      <br />
      <div className="ledgerBoard">
        <div>
          {project.subaccounts.length === 0 && (
            <p>
              Before you can add any Concept you have to first add Subaccounts
            </p>
          )}
          <Form
            name="concept-form"
            form={form}
            layout="inline"
            onFinish={addConcept}
          >
            <Form.Item name="subaccount" label="Concept">
              <Select placeholder="Subaccount">
                {subaccountItems.map((subaccount) => (
                  <Option key={subaccount._id} value={subaccount.name}>
                    {subaccount.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="description">
              <Input size="medium" placeholder="Description"></Input>
            </Form.Item>
            <Form.Item name="date">
              <DatePicker />
            </Form.Item>
            <Form.Item name="amount">
              <Input size="medium" placeholder="Amount"></Input>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <br />
          <br />
        </div>
        <div className="tablePanel">
          {concepts.length === 0 ? (
            <p>No concepts to show yet</p>
          ) : (
            <ConceptTable concepts={concepts} deleteAction={deleteConcept} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}

export default Ledger;
