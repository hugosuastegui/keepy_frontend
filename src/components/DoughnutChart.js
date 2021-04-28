import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Formik, Form, Field } from "formik";

function DoughnutChart({ data }) {
  const [month, setMonth] = useState(0);

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

  console.log("========= REVENUE =========");
  console.log(revenueLabels);
  console.log(revenueData);
  console.log("========= COGS =========");
  console.log(cogsLabels);
  console.log(cogsData);

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

  return (
    <div className="briefBoard">
      <div className="briefBoardHeadings">
        <h3 className="briefBoardTitle">Revenue Streams vs COGS Mix</h3>
        <div className="briefBoardActions">
          <Formik
            initialValues={{ month: "Jan" }}
            onSubmit={async (values, { setSubmitting }) => {
              let passthruValue;
              switch (values.month) {
                case "Jan":
                  passthruValue = 0;
                  break;
                case "Feb":
                  passthruValue = 1;
                  break;
                case "Mar":
                  passthruValue = 2;
                  break;
                case "Apr":
                  passthruValue = 3;
                  break;
                case "May":
                  passthruValue = 4;
                  break;
                case "Jun":
                  passthruValue = 5;
                  break;
                case "Jul":
                  passthruValue = 6;
                  break;
                case "Aug":
                  passthruValue = 7;
                  break;
                case "Sep":
                  passthruValue = 8;
                  break;
                case "Oct":
                  passthruValue = 9;
                  break;
                case "Nov":
                  passthruValue = 10;
                  break;
                case "Dec":
                  passthruValue = 11;
                  break;
                default:
                  break;
              }
              // setMonth(passthruValue);
              console.log(passthruValue);
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
      <div className="doubleChart briefPanel">
        {revenueLabels.length !== 0 ? (
          <Doughnut
            data={graphDataPositive}
            options={{
              responsive: false,
              maintainAspectRatio: true,
            }}
          />
        ) : (
          <p>Insufficient Data to show insights</p>
        )}
        {cogsLabels.length !== 0 ? (
          <Doughnut
            data={graphDataNegative}
            options={{
              responsive: false,
              maintainAspectRatio: true,
            }}
          />
        ) : (
          <p>Insufficient Data to show insights</p>
        )}
      </div>
    </div>
  );
}

export default DoughnutChart;
