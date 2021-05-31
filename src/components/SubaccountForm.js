import React, { useState } from "react";

function SubaccountForm({ submitAction }) {
  const [form, setForm] = useState({
    name: "",
    account: "",
  });
  const [errorMessage, seterrorMessage] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setForm({
      ...form,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.name === "" || form.account === "") {
      seterrorMessage("All fields are mandatory");
      return;
    }
    submitAction(form);
    console.log(form);
  };

  return (
    <div className="subaccountFormContainer">
      <h3 style={{ fontWeight: "bold" }}>New Subaccount</h3>
      <form>
        <div className="subaccountForm">
          <div className="subaccountField">
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange} />
            <label>Account</label>
            <select name="account" onChange={handleChange}>
              <option value="Revenue">Revenue</option>
              <option value="COGS">COGS</option>
              <option value="SG&A">SG&A</option>
              <option value="Taxes">Taxes</option>
              <option value="CapEX">CapEX</option>
              <option value="Dividends">Dividends</option>
              <option value="Retained Earnings">Retained Earnings</option>
            </select>
          </div>
          <button onClick={handleSubmit}>Submit</button>
          <div className="errorMessage">{errorMessage}</div>
        </div>
      </form>
    </div>
  );
}

export default SubaccountForm;
