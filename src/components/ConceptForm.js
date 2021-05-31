import React, { useState } from "react";
import Select from "react-select";
import NumberFormat from "react-number-format";

function ConceptForm({ projectId, subaccountItems, addConcept }) {
  const internalDate = new Date();
  const [form, setForm] = useState({
    subaccount: null,
    date: internalDate,
    description: null,
    amount: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleChange = (event) => {
    const value = event.target.value;
    setForm({
      ...form,
      [event.target.name]: value,
    });
  };

  const handleChangeSelect = (event) => {
    setForm({
      ...form,
      subaccount: event.value,
    });
  };

  const handleChangeAmount = (value) => {
    setForm({
      ...form,
      amount: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      form.subaccount === null ||
      form.description === null ||
      form.amount === null
    ) {
      setErrorMessage("All fields are mandatory");
      return;
    } else {
      const newDate = new Date(form.date);
      newDate.setDate(newDate.getDate() + 1);
      const newConcept = {
        description: form.description,
        day: newDate.toLocaleString("default", { day: "2-digit" }),
        month: newDate.toLocaleString("default", { month: "short" }),
        year: newDate.toLocaleString("default", { year: "numeric" }),
        amount: parseInt(form.amount, 10),
        subaccount: { name: form.subaccount },
      };
      addConcept(newConcept);
      setErrorMessage(null);
    }
  };

  return (
    <div className="conceptFormContainer">
      <h3 style={{ fontWeight: "bold" }}>New Concept</h3>
      <form>
        <div className="conceptForm">
          <div className="conceptField" style={{ width: "30%" }}>
            <label>Date</label>
            <input
              style={{ width: "auto" }}
              name="date"
              type="date"
              onChange={handleChange}
            />
          </div>
          <div
            className="conceptField"
            style={{ width: "70%", margin: "0px 0px 0px 5px" }}
          >
            <label>Subaccount</label>
            <Select
              styles={customStyles}
              options={subaccountItems}
              onChange={handleChangeSelect}
            />
          </div>
        </div>
        <div className="conceptForm">
          <div
            className="conceptField"
            style={{ width: "100%", margin: "0px 5px 0px 0px" }}
          >
            <label>Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              placeholder="Description"
            />
          </div>
          <div className="conceptField" style={{ width: "auto" }}>
            <label>Amount</label>

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
        </div>
        <div className="actions-messages">
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
          <div className="errorMessage">{errorMessage}</div>
        </div>
      </form>
    </div>
  );
}

export default ConceptForm;
