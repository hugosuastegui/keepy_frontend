import React, { useState, useEffect, useContext, useRef } from "react";
import { useQuery } from "react-query";
import { Context } from "../context";
import MY_SERVICES from "../services/index";

const { fetchSubtotals } = MY_SERVICES;

function Brief() {
  const { user, project } = useContext(Context);
  const [year, setYear] = useState(2021);
  const [fecthedData, setFecthedData] = useState(null);

  const yearInput = useRef(null);

  const projectId = project._id;

  const { data, status } = useQuery(
    ["subtotals", { projectId, year }],
    fetchSubtotals
  );

  useEffect(() => {
    setFecthedData(data);
  }, [status, year]);

  const submitYear = () => {
    console.log(`click on submit year ${yearInput.current.value}`);
    setYear(yearInput.current.value);
  };

  return (
    <div>
      <div className="headings">
        <h1>{project.name}</h1>
        {status}
      </div>
      <div className="main-board">
        <div className="buttons">
          <p>Please select the year:</p>
          <select ref={yearInput} name="Year">
            <option value="2021" defaultValue>
              2021
            </option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
          <button type="submit" onClick={() => submitYear()}>
            Submit
          </button>
          <div className="tablePanel">
            <table className="PLTable">
              <tbody>
                <tr>
                  <th>Concept</th>
                  <th>Jan</th>
                  <th>Feb</th>
                  <th>Mar</th>
                  <th>Apr</th>
                  <th>May</th>
                  <th>Jun</th>
                  <th>Jul</th>
                  <th>Sep</th>
                  <th>Aug</th>
                  <th>Oct</th>
                  <th>Nov</th>
                  <th>Dec</th>
                </tr>
                {fecthedData &&
                  fecthedData.map((el) => (
                    <tr key={el.name}>
                      <td key={el.name}>{el.name}</td>
                      {el.values.map((val) => (
                        <td key={val.name}>{val}</td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brief;
