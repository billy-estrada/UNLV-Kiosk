import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
// import { SolarAPIResponse } from "./../SolarAPIResponse";
// import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SolarPolarAreaAttempt2 = () => {
  const barColors = [
    "rgba(255, 99, 132, 0.3)",
    "rgba(54, 162, 235, 0.3)",
    "rgba(255, 206, 86, 0.3)",
    "rgba(75, 192, 192, 0.3)",
    "rgba(153, 102, 255, 0.3)",
    "rgba(255, 159, 64, 0.3)",
    "rgba(255, 159, 64, 0.3)",
    "rgba(46, 184, 92, 0.3)",
    "rgba(221, 109, 166, 0.3)",
    "rgba(123, 91, 197, 0.3)",
    "rgba(15, 178, 228, 0.3)",
    "rgba(255, 155, 32, 0.3)",
    "rgba(82, 216, 239, 0.3)",
    "rgba(200, 67, 163, 0.3)",
    "rgba(64, 207, 167, 0.3)",
    "rgba(104, 58, 152, 0.3)",
    "rgba(238, 130, 71, 0.3)",
  ];
  const borderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(46, 184, 92, 1)",
    "rgba(221, 109, 166, 1)",
    "rgba(123, 91, 197, 1)",
    "rgba(15, 178, 228, 1)",
    "rgba(255, 155, 32, 1)",
    "rgba(82, 216, 239, 1)",
    "rgba(200, 67, 163, 1)",
    "rgba(64, 207, 167, 1)",
    "rgba(104, 58, 152, 1)",
    "rgba(238, 130, 71, 1)",
  ];
  const data = {
    labels: ["beep", "boop", "bop", "meow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [1, 20, 3, 36, 23, 6, 14, 18],
        backgroundColor: barColors,
        borderColor: borderColors,
      },
    ],
  };

  return (
    <>
      <PolarArea data={data} />
    </>
  );
};
