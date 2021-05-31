import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Redirect, Link } from "react-router-dom";
import { Context } from "../context";
import ConceptTable from "../components/ConceptTable";
import ConceptForm from "../components/ConceptForm";

import MY_SERVICES from "../services/index";

const { getAllConcepts, getCataloguedSubaccounts, createConcept } = MY_SERVICES;

function Ledger({ history }) {
  const { project, user } = useContext(Context);
  const [newConcepts, setNewConcepts] = useState([]);

  const projectId = project._id;

  const { data: concepts, status: conceptsStatus } = useQuery(
    ["concepts", { projectId }],
    getAllConcepts
  );

  const {
    data: subaccountItems,
    status: subaccountItemsStatus,
    refetch,
  } = useQuery(["subaccounts", { projectId }], getCataloguedSubaccounts);

  const addConcept = (newConcept) => {
    setNewConcepts([...newConcepts, newConcept]);
  };

  const createAllConcepts = async (array) => {
    for (let i = 0; i < array.length; i++) {
      await createConcept(project._id, array[i]);
    }
    setNewConcepts([]);
    refetch();
  };

  const deleteConcept = (index) => {
    const newArr = newConcepts.filter((el, ind) => ind !== index);
    setNewConcepts(newArr);
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
              projectId={projectId}
              subaccountItems={subaccountItems}
              addConcept={addConcept}
            />
          )}
          <br />
        </div>
        {newConcepts.length !== 0 ? (
          <div>
            <h3>Items to be added...</h3>
            <div className="tablePanel">
              <ConceptTable
                concepts={newConcepts}
                deleteAction={deleteConcept}
                deleteColumn={true}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <br />
        <div>
          <h3>On Ledger</h3>
          <div className="tablePanel">
            {conceptsStatus !== "success" ? (
              <p>{conceptsStatus}</p>
            ) : (
              <ConceptTable
                concepts={concepts}
                deleteAction={deleteConcept}
                deleteColumn={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/"></Redirect>
  );
}

export default Ledger;
