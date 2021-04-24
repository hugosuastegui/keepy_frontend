import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Formik, Form, Field } from "formik";

function DoughnutChart({ data, month }) {
  const revenueLabels = data.map((account) => {
    let newArr = [];
    if (account.name === "Revenue") {
      newArr = account.subaccounts;
    }
    return newArr;
  });

  const revenueData = data.map((account) => {
    let newArr = [];
    if (account.name === "Revenue") {
      account.subaccounts.forEach((el) => {
        newArr.push(el.values[month]);
      });
    }
    return newArr;
  });

  const cogsLabels = data.map((account) => {
    let newArr = [];
    if (account.name === "COGS") {
      newArr = account.subaccounts;
    }
    return newArr;
  });

  const cogsData = data.map((account) => {
    let newArr = [];
    if (account.name === "COGS") {
      account.subaccounts.forEach((el) => {
        newArr.push(el.values[month]);
      });
    }
    return newArr;
  });

  const revenueColors = [
    "darkgreen",
    "green",
    "forestgreen",
    "seagreen",
    "mediumseagreen",
    "mediumspringgreen",
    "limegreen",
    "lime",
    "chartreuse",
  ];

  const cogsColors = [
    "darkred",
    "firebrick",
    "crimson",
    "red",
    "lightsalmon",
    "darksalmon",
    "salmon",
    "lightcoral",
    "indianred",
  ];

  console.log("========= REVENUE =========");
  console.log(revenueLabels);
  console.log(revenueData);
  console.log("========= COGS =========");
  console.log(cogsLabels);
  console.log(cogsData);

  const graphDataPositive = {
    labels: ["Red", "Blue", "Yellow", "Orange"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100, 200],
        backgroundColor: [
          "rgb(255, 99, 150)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
    responsive: false,
  };

  const graphDataNegative = {
    labels: ["Red", "Blue", "Yellow", "Orange"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100, 200],
        backgroundColor: [
          "rgb(255, 99, 150)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
    responsive: false,
  };

  return (
    <div className="briefBoard">
      <div className="briefBoardHeadings">
        <h3 className="briefBoardTitle">Revenue Streams vs COGS Streams</h3>
        <div className="briefBoardActions">
          <Formik
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
      <div className="doubleChart briefPanel">
        <Doughnut
          data={graphDataPositive}
          options={{
            responsive: false,
            maintainAspectRatio: true,
          }}
        />
        <Doughnut
          data={graphDataNegative}
          options={{
            responsive: false,
            maintainAspectRatio: true,
          }}
        />
      </div>
    </div>
  );
}

export default DoughnutChart;
