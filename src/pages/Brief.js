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
  const [month, setMonth] = useState("Jan");

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

  const submitDoughnutChart = () => {
    console.log("Inside doughnut chart");
  };

  return typeof data !== "undefined" && typeof years !== "undefined" ? (
    <div className="briefPage">
      <h1>{project.name}</h1>
      <div className="briefPageActions"></div>
      {/* Metric Compatison Chart */}
      <LineGraph
        data={data}
        metric1={metric1}
        metric2={metric2}
        setMetric1={setMetric1}
        setMetric2={setMetric2}
      ></LineGraph>
      {/* Dougnut Charts */}
      <div className="doubleChart">
        <DoughnutChart
          data={data}
          month={month}
          setMonth={setMonth}
        ></DoughnutChart>
        <DoughnutChart
          data={data}
          month={month}
          setMonth={setMonth}
        ></DoughnutChart>
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
