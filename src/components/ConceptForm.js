import React, { useState } from "react";

function ConceptForm({ subaccountItems, addConcept }) {
  const internalDate = new Date();
  const [form, setForm] = useState({
    subaccount: "",
    date: internalDate,
    description: "",
    amount: null,
  });

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
            <input name="subaccount" list="brow" onChange={handleChange} />
            <datalist id="brow">
              {subaccountItems.map((subaccount) => (
                <option value={subaccount.name} />
              ))}
            </datalist>
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
