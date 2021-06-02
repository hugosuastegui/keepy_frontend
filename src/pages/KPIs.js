import React, { useState, useContext } from "react";
import Select from "react-select";
import { Context } from "../context";
import { useQuery } from "react-query";

import MY_SERVICES from "../services/index";

const { getCataloguedSubaccounts, getAllKpis, createKpi } = MY_SERVICES;

function KPIs() {
  const { project, user } = useContext(Context);
  const [form, setForm] = useState({
    name: "",
    metric1: null,
    metric2: null,
    operation: null,
    description: "",
  });
  const [errorMessage, seterrorMessage] = useState("");

  const projectId = project._id;

  const { data: subaccountItems, status: subaccountItemsStatus } = useQuery(
    ["subaccounts", { projectId }],
    getCataloguedSubaccounts
  );

  const {
    data: kpiItems,
    status: kpiItemsStatus,
    refetch,
  } = useQuery(["kpis", { projectId }], getAllKpis);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createKpi(form, projectId);
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeSelect1 = (event) => {
    setForm({
      ...form,
      metric1: event.value,
    });
  };

  const handleChangeSelect2 = (event) => {
    setForm({
      ...form,
      metric2: event.value,
    });
  };

  return (
    <div className="kpiPage">
      <h1>KPIs Page</h1>
      <p className="pageIntro">
        KPIs are customized performance metrics to follow upclose a specific
        part of your business
      </p>
      <div className="subaccountFormContainer">
        <h3 style={{ fontWeight: "bold" }}>New KPI</h3>
        <form>
          <div className="subaccountForm">
            <div className="subaccountField">
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Name"
              />
              <label>Metric 1</label>
              <Select
                styles={customStyles}
                options={subaccountItems}
                onChange={handleChangeSelect1}
              />

              <label>Metric 2</label>
              <Select
                styles={customStyles}
                options={subaccountItems}
                onChange={handleChangeSelect2}
              />
              <section className="radioButtons" onChange={handleChange}>
                <input type="radio" name="operation" value="ratio" />
                <label>Ratio</label>
                <input type="radio" name="operation" value="sum" />
                <label>Sum</label>
                <input type="radio" name="operation" value="difference" />
                <label>Difference</label>
              </section>
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                style={{ resize: "none" }}
                placeholder="Enter description here"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <button onClick={handleSubmit} className="formButton">
            Submit
          </button>
          <div className="errorMessage">{errorMessage}</div>
        </form>
      </div>
      {kpiItemsStatus === "success" ? (
        kpiItems.length !== 0 ? (
          <div className="tablePanel kpiTable">
            <table>
              <thead>
                <tr>
                  <th>KPI</th>
                  <th>Description</th>
                  <th>Involved Metrics</th>
                </tr>
              </thead>
              <tbody>
                {kpiItems.map((el) => (
                  <tr>
                    <td>{el.name}</td>
                    <td>{el.description}</td>
                    <td>
                      {el.metric1.name}, {el.metric2.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>KPIs will be shown here once they are created</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default KPIs;
