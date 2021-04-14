import React from "react";
import { Formik, Form, Field } from "formik";

function BriefTable({ data, years, selectAction }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 1,
  });

  console.log(years[0]);

  return (
    <div className="briefBoard">
      <div className="briefBoardHeadings">
        <h3 className="briefBoardTitle">P&L</h3>
        <div className="briefBoardActions">
          <Formik
            initialValues={{
              year: years[0],
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values.year);
              // selectAction(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field as="select" name="year">
                  {years.map((el) => (
                    <option value={el}>{el}</option>
                  ))}
                </Field>
                <button
                  className="primaryButton"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="tablePanel">
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
                          {typeof sval === "number"
                            ? formatter.format(sval)
                            : sval}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BriefTable;
