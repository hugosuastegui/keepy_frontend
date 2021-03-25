import React from "react";

function BriefTable({ data }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 1,
  });

  return (
    <table className="concept">
      <thead>
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
      </thead>
      <tbody>
        {data &&
          data.map((el) => (
            <tr key={el.name}>
              <td key={el.name} className="headcol">
                {el.name}
              </td>
              {el.values.map((val) => (
                <td key={val.name}>{formatter.format(val)}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default BriefTable;
