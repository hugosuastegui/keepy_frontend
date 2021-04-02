import React from "react";
import { Line } from "react-chartjs-2";

function LineGraph({ data, metric1, metric2 }) {
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
  return <Line data={graphData} />;
}

export default LineGraph;
