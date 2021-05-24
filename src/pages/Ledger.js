import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Redirect, Link } from "react-router-dom";
import { Context } from "../context";
import ConceptTable from "../components/ConceptTable";
import ConceptForm from "../components/ConceptForm";

import MY_SERVICES from "../services/index";

const { getAllConcepts, getSubaccounts, createConcept } = MY_SERVICES;

function Ledger({ history }) {
  const { project, user } = useContext(Context);
  const [newConcepts, setNewConcepts] = useState([]);

  const projectId = project._id;

  const { data: concepts, status: conceptsStatus } = useQuery(
    ["concepts", { projectId }],
    getAllConcepts
  );

  const { data: subaccountItems, status: subaccountItemsStatus } = useQuery(
    ["subaccounts", { projectId }],
    getSubaccounts
  );

  const addConcept = (newConcept) => {
    setNewConcepts([...newConcepts, newConcept]);
  };

  const createAllConcepts = async (array) => {
    for (let i = 0; i < array.length; i++) {
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
      <div className="ledgerBoard">
        <div style={{ width: "90%" }}>
          {subaccountItemsStatus !== "success" ? (
            <p>{subaccountItemsStatus}</p>
          ) : (
            <ConceptForm
              subaccountItems={subaccountItems}
              addConcept={addConcept}
            />
          )}
          <br />
        </div>
        <div>{/* <ConceptForm subaccountItems={subaccountItems} /> */}</div>
        <div className="tablePanel">
          {conceptsStatus !== "success" ? (
            <p>{conceptsStatus}</p>
          ) : (
            <ConceptTable concepts={concepts} deleteAction={deleteConcept} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/"></Redirect>
  );
}

export default Ledger;
