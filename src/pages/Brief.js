import React, { useState, useContext, useRef } from "react";
import { useQuery } from "react-query";
import { Context } from "../context";
import BriefTable from "../components/BriefTable";
import LineGraph from "../components/LineGraph";
import DoughnutChart from "../components/DoughnutChart";
import MY_SERVICES from "../services/index";

const { fetchSubtotals, getConceptYears } = MY_SERVICES;

function Brief() {
  const { project } = useContext(Context);
  const [metric1, setMetric1] = useState("Revenue");
  const [metric2, setMetric2] = useState("COGS");

  const metric1Input = useRef(null);
  const metric2Input = useRef(null);
  const projectId = project._id;

  const { data: years, status: yearsStatus } = useQuery(
    ["years", { projectId }],
    getConceptYears
  );

  const { data, status } = useQuery(
    ["subtotals", { projectId, years }],
    fetchSubtotals
  );

  const submitYear = () => {
    // setYear(yearInput.current.value);
  };

  const submitComparison = () => {
    console.log(metric1);
    console.log(metric2);
    setMetric1(metric1Input.current.value);
    setMetric2(metric2Input.current.value);
  };

  const submitDoughnutChart = () => {
    console.log("Inside doughnut chart");
  };

  return typeof data !== "undefined" && typeof years !== "undefined" ? (
    <div className="briefPage">
      <h1>{project.name}</h1>
      <div className="briefPageActions"></div>
      {/* Metric Compatison Chart */}
      <div className="briefBoard">
        <div className="briefBoardHeadings">
          <h3 className="briefBoardTitle">Metric Comparison Chart</h3>
          <div className="briefBoardActions">
            {typeof data !== "undefined" && (
              <select
                ref={metric1Input}
                name="Metric1"
                className="primarySelect"
              >
                {data.map((el) => (
                  <option value={el.name}>{el.name}</option>
                ))}
              </select>
            )}
            vs
            {typeof data !== "undefined" && (
              <select
                ref={metric2Input}
                name="Metric2"
                className="primarySelect"
              >
                {data.map((el) => (
                  <option value={el.name}>{el.name}</option>
                ))}
              </select>
            )}
            <button
              className="primaryButton"
              onClick={() => submitComparison()}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="briefPanel">
          {typeof data !== "undefined" && (
            <LineGraph
              data={data}
              metric1={metric1}
              metric2={metric2}
            ></LineGraph>
          )}
        </div>
      </div>
      <div className="briefBoard">
        <div className="briefBoardHeadings">
          <h3 className="briefBoardTitle">Doughnut Chart for the period</h3>
          <div className="briefBoardActions">
            {typeof data !== "undefined" && (
              <select
                ref={metric1Input}
                name="Metric1"
                className="primarySelect"
                value={metric1}
              >
                {data.map((el) => (
                  <option value={el.name}>{el.name}</option>
                ))}
              </select>
            )}
            <button
              className="primaryButton"
              onClick={() => submitDoughnutChart()}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="briefPanel">
          {typeof data !== "undefined" && (
            <DoughnutChart data={data} metric1={metric1}></DoughnutChart>
          )}
        </div>
      </div>
      {/* P&L */}
      <BriefTable
        data={data}
        years={years}
        selectAction={submitYear}
      ></BriefTable>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default Brief;
