import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Formik, Form, Field } from "formik";

function DoughnutChart({ data }) {
  const [month, setMonth] = useState(new Date().getMonth());

  const [{ subaccounts: revenueSubaccounts }] = data.filter(
    (account) => account.name === "Revenue"
  );
  const [{ subaccounts: cogsSubaccounts }] = data.filter(
    (account) => account.name === "COGS"
  );

  const revenueLabels = revenueSubaccounts.map(
    (subaccount) => subaccount.subaccount
  );
  const revenueData = revenueSubaccounts.map(
    (subaccount) => subaccount.values[month]
  );

  const cogsLabels = cogsSubaccounts.map((subaccount) => subaccount.subaccount);
  const cogsData = cogsSubaccounts.map(
    (subaccount) => subaccount.values[month]
  );

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

  const graphDataPositive = {
    labels: revenueLabels,
    datasets: [
      {
        label: "Revenue Streams",
        data: revenueData,
        backgroundColor: revenueColors,
        hoverOffset: 4,
      },
    ],
    responsive: false,
  };

  const graphDataNegative = {
    labels: cogsLabels,
    datasets: [
      {
        label: "COGS Mix",
        data: cogsData,
        backgroundColor: cogsColors,
        hoverOffset: 4,
      },
    ],
    responsive: false,
  };

  const chartOptions = {
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          );
          return currentValue + " (" + percentage + "%)";
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
  };

  return (
    <div className="briefBoard">
      <div className="briefBoardHeadings">
        <h3 className="briefBoardTitle">Revenue Streams vs COGS Mix</h3>
        <div className="briefBoardActions">
          <Formik
            initialValues={{ month: new Date().getMonth() }}
            onSubmit={async (values, { setSubmitting }) => {
              setMonth(values.month);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  component="select"
                  name="month"
                  className="primarySelect"
                >
                  <option value={0}>Jan</option>
                  <option value={1}>Feb</option>
                  <option value={2}>Mar</option>
                  <option value={3}>Apr</option>
                  <option value={4}>May</option>
                  <option value={5}>Jun</option>
                  <option value={6}>Jul</option>
                  <option value={7}>Aug</option>
                  <option value={8}>Sep</option>
                  <option value={9}>Oct</option>
                  <option value={10}>Nov</option>
                  <option value={11}>Dec</option>
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
      <div className="doubleChart">
        <div className="doughnutContainer ">
          <h3 className="briefBoardSecondTitle">Revenue Mix</h3>
          {revenueLabels.length !== 0 ? (
            <Doughnut data={graphDataPositive} options={chartOptions} />
          ) : (
            <p>Insufficient Data to show insights</p>
          )}
        </div>
        <div className="doughnutContainer ">
          <h3 className="briefBoardSecondTitle">COGS Mix</h3>
          {cogsLabels.length !== 0 ? (
            <Doughnut data={graphDataNegative} options={chartOptions} />
          ) : (
            <p>Insufficient Data to show insights</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoughnutChart;
