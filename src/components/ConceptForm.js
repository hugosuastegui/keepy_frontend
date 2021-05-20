import React, { useState } from "react";

function ConceptForm({ subaccountItems }) {
  const [form, setForm] = useState({
    subaccount: "",
    date: new Date(),
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
    const newConcept = {
      description: form.description,
      day: newDate.toLocaleString("default", { day: "2-digit" }),
      month: newDate.toLocaleString("default", { month: "short" }),
      year: newDate.toLocaleString("default", { year: "numeric" }),
      amount: parseInt(form.amount, 10),
      subaccount: { name: form.subaccount },
    };
    console.log(newConcept);
  };

  return (
    <div className="conceptFormContainer">
      <h3>New Concept</h3>
      <form>
        <div className="conceptForm">
          <div className="concepField">
            <label>Subaccount</label>
            <input name="subaccount" list="brow" onChange={handleChange} />
            <datalist id="brow">
              <option value="Internet Explorer" />
              <option value="Firefox" />
              <option value="Chrome" />
              <option value="Opera" />
              <option value="Safari" />
            </datalist>
          </div>
          <div className="concepField">
            <label>Date</label>
            <input
              style={{ width: "auto" }}
              name="date"
              type="date"
              onChange={handleChange}
            />
          </div>
          <div className="concepField">
            <label>Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              placeholder="Description"
            />
          </div>
          <div className="concepField">
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
