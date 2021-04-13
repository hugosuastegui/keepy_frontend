import React from "react";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart({ data, metric1 }) {
  const labels = data.map((account) => {
    let newArr = [];
    if (account.name === metric1) {
      newArr = account.subaccounts;
    }
    return newArr;
  });

  console.log(labels);

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
  return <Doughnut data={graphData} />;
}

export default DoughnutChart;
