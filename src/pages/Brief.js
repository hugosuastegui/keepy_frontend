import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import { Context } from "../context";
import BriefTable from "../components/BriefTable";
import LineGraph from "../components/LineGraph";
import DoughnutChart from "../components/DoughnutChart";
import { Redirect, Link } from "react-router-dom";
import MY_SERVICES from "../services/index";

const { fetchSubtotals, getConceptYears } = MY_SERVICES;

function Brief() {
  const { project, user } = useContext(Context);
  const [year, setYear] = useState(new Date().getFullYear());
  const [metric1, setMetric1] = useState("Revenue");
  const [metric2, setMetric2] = useState("COGS");

  const projectId = project._id;

  const { data: years, status: yearsStatus } = useQuery(
    ["years", { projectId }],
    getConceptYears
  );

  const { data, status } = useQuery(
    ["subtotals", { projectId, year }],
    fetchSubtotals
  );

  const submitYear = (value) => {
    setYear(value);
  };

  return user ? (
    typeof data !== "undefined" && typeof years !== "undefined" ? (
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
        <DoughnutChart data={data}></DoughnutChart>
        {/* P&L */}
        <BriefTable
          data={data}
          years={years}
          selectAction={submitYear}
        ></BriefTable>
      </div>
    ) : (
      <p>Loading...</p>
    )
  ) : (
    <Redirect to="/"></Redirect>
  );
}

export default Brief;
