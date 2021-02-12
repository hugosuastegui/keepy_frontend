import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Context } from "../context";
import { Form, Input, Select, Button, Typography } from "antd";
import MY_SERVICES from "../services/index";
import Projects from "./Projects";

const { getAllConcepts } = MY_SERVICES;
const { Title } = Typography;

function Ledger() {
  const { user, project } = useContext(Context);
  const [concepts, setConcepts] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchConcepts() {}
    fetchConcepts();
    return () => {
      return null;
    };
  }, []);

  return user ? (
    <div>
      <Title>Ledger</Title>
      {project ? (
        <>
          <p>Before you can add any concept yo have to first add Subaccounts</p>
          <Button type="default">
            <Link to={`/subaccounts/${project._id}`}>Subaccounts</Link>
          </Button>
        </>
      ) : (
        <p>First you have to select a project from the Projects Tab</p>
      )}
    </div>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}

export default Ledger;
