import React from "react";
import { Line } from "react-chartjs-2";
import { Formik, Form, Field } from "formik";

function LineGraph({ data, metric1, metric2, setMetric1, setMetric2 }) {
  const [first] = data.filter((array) => array.name === metric1);
  const [second] = data.filter((array) => array.name === metric2);

  const graphData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: first.name,
        data: first.values,
        borderColor: "red",
      },
      {
        label: second.name,
        data: second.values,
        borderColor: "blue",
      },
    ],
  };
  return (
    <div className="briefBoard">
      <div className="briefBoardHeadings">
        <h3 className="briefBoardTitle">Metric Comparison Chart</h3>
        <div className="briefBoardActions">
          <Formik
            initialValues={{ metric1: "Revenue", metric2: "COGS" }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values.metric1);
              console.log(values.metric2);
              setMetric1(values.metric1);
              setMetric2(values.metric2);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field as="select" name="metric1" className="primarySelect">
                  {data.map((el) => (
                    <option value={el.name}>{el.name}</option>
                  ))}
                </Field>
                <Field as="select" name="metric2" className="primarySelect">
                  {data.map((el) => (
                    <option value={el.name}>{el.name}</option>
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
      <div className="briefPanel">
        <Line data={graphData} />
      </div>
    </div>
  );
}

export default LineGraph;
