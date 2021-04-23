import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Formik, Form, Field } from "formik";

function DoughnutChart({ data, metric, month }) {
  const labels = data.map((account) => {
    let newArr = [];
    if (account.name === metric) {
      newArr = account.subaccounts;
    }
    return newArr;
  });

  const labelData = data.map((account) => {
    let newArr = [];
    if (account.name === metric) {
      account.name.subaccounts.forEach((el) => {
        newArr.push(el.values[month]);
      });
    }
    return newArr;
  });

  console.log(labels);
  console.log(labelData);

  const graphData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="briefBoard">
      <div className="briefBoardHeadings">
        <h3 className="briefBoardTitle">Doughnut Chart for the period</h3>
        <div className="briefBoardActions">
          <Formik
            initialValues={{ metric1: "Revenue", metric2: "COGS" }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field as="select" name="month" className="primarySelect">
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                  <option value="Apr">Apr</option>
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
      <div className="briefPanel">
        <Doughnut data={graphData} />
      </div>
    </div>
  );
}

export default DoughnutChart;
