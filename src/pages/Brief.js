import React, { useState, useContext, useRef } from "react";
import { useQuery } from "react-query";
import { Context } from "../context";
import BriefTable from "../components/BriefTable";
import LineGraph from "../components/LineGraph";
import MY_SERVICES from "../services/index";

const { fetchSubtotals } = MY_SERVICES;

function Brief() {
  const { project } = useContext(Context);
  const [year, setYear] = useState(2021);
  const [metric1, setMetric1] = useState("Revenue");
  const [metric2, setMetric2] = useState("COGS");

  const yearInput = useRef(null);
  const metric1Input = useRef(null);
  const metric2Input = useRef(null);
  const projectId = project._id;

  const { data, status } = useQuery(
    ["subtotals", { projectId, year }],
    fetchSubtotals
  );

  const submitYear = () => {
    setYear(yearInput.current.value);
  };

  const submitComparison = () => {
    setMetric1(metric1Input.current.value);
    setMetric2(metric2Input.current.value);
  };

  return (
    <div className="briefPage">
      <h1>{project.name}</h1>
      <div className="briefBoard">
        <div className="briefBoardHeadings">
          <h3 className="briefBoardTitle">P&L</h3>
          <div className="briefBoardActions">
            <select ref={yearInput} name="Year" className="primarySelect">
              <option value="2021" defaultValue>
                2021
              </option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
            <button className="primaryButton" onClick={() => submitYear()}>
              Submit
            </button>
            <br />
            <br />
          </div>
        </div>
        <div className="tablePanel">
          {typeof data !== "undefined" && (
            <BriefTable data={data} status={status}></BriefTable>
          )}
        </div>
      </div>
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
    </div>
  );
}

export default Brief;
