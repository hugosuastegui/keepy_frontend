import React, { useState, useContext, useRef } from "react";
import { useQuery } from "react-query";
import { Context } from "../context";
import BriefTable from "../components/BriefTable";
import MY_SERVICES from "../services/index";

const { fetchSubtotals } = MY_SERVICES;

function Brief() {
  const { project } = useContext(Context);
  const [year, setYear] = useState(2021);

  const yearInput = useRef(null);
  const projectId = project._id;

  const { data, status } = useQuery(
    ["subtotals", { projectId, year }],
    fetchSubtotals
  );

  const submitYear = () => {
    setYear(yearInput.current.value);
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
    </div>
  );
}

export default Brief;
