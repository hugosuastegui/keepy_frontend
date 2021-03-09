import React, { useState, useContext, useRef } from "react";
import { Context } from "../context";

function Brief() {
  const { user, project } = useContext(Context);
  const [year, setYear] = useState(null);
  const yearInput = useRef(null);

  const submitYear = () => {
    console.log(`click on submit year ${yearInput.current.value}`);
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
