import React, { useContext } from "react";
import { Context } from "../context";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";

import SubaccountTable from "../components/SubaccountTable";
import SubaccountForm from "../components/SubaccountForm";

import MY_SERVICES from "../services/index";
const { createSubaccount, getCataloguedSubaccounts } = MY_SERVICES;

function Subaccounts({ history }) {
  const { user, project } = useContext(Context);

  const projectId = project._id;

  const {
    data: subaccountItems,
    status: subaccountItemsStatus,
    refetch,
  } = useQuery(["subaccounts", { projectId }], getCataloguedSubaccounts);

  const submitSubaccount = async (subaccount) => {
    await createSubaccount(subaccount, projectId);
    refetch();
  };

  return user ? (
    <div className="subaccountsPage">
      <h1>Subaccounts</h1>
      <p className="pageIntro">
        Subaccounts are ways to classify concepts by type. Ever wondered how
        much money does an item accounts for in your total Revenue? Create a
        Subaccount for that item so you can handle its metrics on the Brief
        section!
      </p>
      <SubaccountForm submitAction={submitSubaccount} />
      {subaccountItemsStatus === "success" && (
        <div className="singleTable">
          <h6>Subaccounts</h6>
          <div className="tablePanel">
            <SubaccountTable cataloguedItems={subaccountItems} />
          </div>
        </div>
      )}
    </div>
  ) : (
    <Redirect to="/"></Redirect>
  );
}

export default Subaccounts;
