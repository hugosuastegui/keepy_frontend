import React from "react";

function BriefTable({ data, status }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 1,
  });

  console.log(status);
  console.log(data);

  return (
    <table>
      <thead>
        <tr>
          <th className="sticky">Concept</th>
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
        {typeof data !== undefined &&
          data.map((el) => (
            <>
              <tr>
                <td className="headcol sticky">{el.name}</td>
                {el.values.map((val) => (
                  <td>
                    {typeof val === "number" ? formatter.format(val) : val}
                  </td>
                ))}
              </tr>
              {el.subaccounts.map((subaccount) => (
                <tr>
                  <td className="headcol briefSubaccount sticky">
                    {subaccount.subaccount}
                  </td>
                  {subaccount.values.map((sval) => (
                    <td className="briefSubaccount">
                      {typeof sval === "number" ? formatter.format(sval) : sval}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
      </tbody>
    </table>
  );
}

export default BriefTable;
