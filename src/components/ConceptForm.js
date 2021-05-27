import React, { useState } from "react";
import Select from "react-select";

function ConceptForm({ subaccountItems, addConcept }) {
  const internalDate = new Date();
  const [form, setForm] = useState({
    subaccount: "",
    date: internalDate,
    description: "",
    amount: null,
  });

  const options = [
    {
      label: "Colours",
      options: [
        { value: "blue", label: "Blue", color: "#0052CC" },
        { value: "yellow", label: "Yellow", color: "#FFC400" },
      ],
    },
    {
      label: "Flavours",
      options: [
        { value: "vanilla", label: "Vanilla", rating: "safe" },
        { value: "chocolate", label: "Chocolate", rating: "good" },
      ],
    },
  ];

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

  const handleSubmit = (event) => {
    event.preventDefault();
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
    console.log(newConcept);
    addConcept(newConcept);
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
            <Select styles={customStyles} options={options} />
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
            <input
              type="number"
              name="amount"
              style={{ width: "100px" }}
              onChange={handleChange}
              placeholder="Amount"
            />
          </div>
        </div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ConceptForm;
