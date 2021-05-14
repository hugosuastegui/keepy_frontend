import React, { useState } from "react";
import { HorizontalBar, Bar } from "react-chartjs-2";
import { Formik, Form, Field } from "formik";

function HorizontalBarChart({ data }) {
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
    labels: ["COGS Mix", "Revenue Mix"],
    datasets: [
      {
        label: revenueLabels,
        data: revenueData,
        backgroundColor: revenueColors,
        hoverOffset: 4,
      },
      {
        label: cogsLabels,
        data: cogsData,
        backgroundColor: cogsColors,
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

  const data2 = {
    labels: ["Revenue Mix"],
    datasets: [
      {
        label: "# of Red Votes",
        data: [12],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "# of Blue Votes",
        data: [2],
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: "# of Green Votes",
        data: [3],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
        },
      ],
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
      <div className="briefPanel">
        {revenueLabels.length !== 0 ? (
          <HorizontalBar data={data2} options={options} />
        ) : (
          <p>Insufficient Data to show insights</p>
        )}
      </div>
    </div>
  );
}

export default HorizontalBarChart;
