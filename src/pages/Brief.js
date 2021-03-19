import React, { useState, useContext, useRef } from "react";
import { useQuery } from "react-query";
import { Context } from "../context";
import MY_SERVICES from "../services/index";

const { fetchSubtotals } = MY_SERVICES;

function Brief() {
  const { user, project } = useContext(Context);
  const [year, setYear] = useState(null);
  const yearInput = useRef(null);

  console.log(project);
  const { data: subtotals, status, refetch } = useQuery(
    ["subtotals", { project, year }],
    fetchSubtotals,
    { enabled: false }
  );

  const submitYear = () => {
    console.log(`click on submit year ${yearInput.current.value}`);
    setYear(yearInput.current.value);
    refetch();
  };

  return (
    <div>
      <div className="headings">
        <h1>{project.name}</h1>
      </div>
      <div className="main-board">
        <div className="buttons">
          <p>Please select the year:</p>
          <select ref={yearInput} name="Year">
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
          <button type="submit" onClick={() => submitYear()}>
            Submit
          </button>
          <div className="panel">Inside the main panel</div>
        </div>
      </div>
    </div>
  );
}

export default Brief;
