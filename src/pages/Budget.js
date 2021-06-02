import React, { useState, useContext } from "react";
import { Context } from "../context";
import { useQuery } from "react-query";
import NumberFormat from "react-number-format";

import MY_SERVICES from "../services/index";

const { getCataloguedSubaccounts } = MY_SERVICES;

function Budget() {
  const { project, user } = useContext(Context);
  const [form, setForm] = useState({
    subaccount: "",
    monthlyBudget: 0,
  });
  const projectId = project._id;

  const { data: subaccountItems, status: subaccountItemsStatus } = useQuery(
    ["subaccounts", { projectId }],
    getCataloguedSubaccounts
  );

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid black" : "1px solid black",
      borderRadius: "none",
      // This line disable the blue border
      // boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: state.isFocused ? "1px solid black" : "1px solid black",
      },
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "black",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "black",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "black"
        : state.isFocused
        ? "lightgrey"
        : "white",
    }),
  };

  const handleChangeAmount = async (value) => {
    console.dir(value);
  };

  const handleSubmit = async (event) => {
    console.dir(event);
  };

  return (
    <div className="budgetPage">
      <h1>Budget Page</h1>
      <p className="pageIntro">
        This tool will help you manage your business using the Zero-Based
        Budgeting Method. This method is the best way to minimoze expandable
        costs and save the most in your business. To get started you should
        first create all budget-controlled subaccounts for your specific
        project.
      </p>
      {subaccountItemsStatus === "success" &&
        subaccountItems.map((account) => (
          <div className="subaccountFormContainer">
            <h3 style={{ fontWeight: "bold" }}>{account.label}</h3>
            <span style={{ fontSize: "small" }}>
              How much does your business intends to{" "}
              {account.label === "Revenue" ? "sale" : "spend"} this month?
            </span>
            <form style={{ padding: "10px" }}>
              {account.options.map((subaccount) => (
                <div className="budgetSubaccount">
                  <label>{subaccount.label}</label>
                  <NumberFormat
                    name="amount"
                    thousandSeparator={true}
                    prefix={"$"}
                    allowNegative={false}
                    allowLeadingZeros={false}
                    decimalScale={2}
                    placeholder={"$0.00"}
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;
                      handleChangeAmount(value);
                    }}
                  />
                </div>
              ))}
              <button onClick={handleSubmit}>
                Submit {account.label} Budget
              </button>
            </form>
          </div>
        ))}
    </div>
  );
}

export default Budget;
