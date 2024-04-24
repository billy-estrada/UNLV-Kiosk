import { useEffect } from "react";
import Chart from "chart.js/auto";

export const SolarWidgetPie = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vSKpBw8CkxXKLKtAzXluunQbMObx33CQCbWw3MNyMrS6f5S_JdRo2qFMInKUlRMmRCS2d8PNV0ehsUU/pub?gid=1471635259&single=true&output=csv"
        );
        const results = await response.text();
        const chartValues = results.split("\n").map((row) => row.split(","));

        if (!chartValues) return;

        const xValues = [
          "BEH",
          "CBC",
          "DAY",
          "MPE C2",
          "MPE C",
          "RLL",
          "SLC A",
          "SLC B1",
          "SLC B2",
          "SLC D",
          "SU",
          "WRI",
          "HAM",
          "RAJ",
          "SEB",
          "GUA",
        ];
        const yValues = chartValues.map((row) => parseFloat(row[1]));
        const barColors = [
          "rgba(31, 0, 143, 0.3)",
          "rgba(93, 19, 152, 0.3)",
          "rgba(134, 45, 161, 0.3)",
          "rgba(169, 72, 172, 0.3)",
          "rgba(200, 100, 103, 0.3)",
          "rgba(176, 38, 7, 0.3)",
          "rgba(181, 85, 9, 0.3)",
          "rgba(184, 121, 33, 0.3)",
          "rgba(183, 172, 63, 0.3)",
          "rgba(3, 83, 5, 0.3)",
          "rgba(7, 111, 26, 0.3)",
          "rgba(42, 146, 20, 0.3)",
          "rgba(55, 185, 28, 0.3)",
          "rgba(104, 222, 79, 0.3)",
          "rgba(168, 232, 154, 0.3)",
          "rgba(66, 133, 244, 0.3)",
        ];
        const borderColors = [
          "rgba(31, 0, 143, 1)",
          "rgba(93, 19, 152, 1)",
          "rgba(134, 45, 161, 1)",
          "rgba(169, 72, 172, 1)",
          "rgba(200, 100, 103, 1)",
          "rgba(176, 38, 7, 1)",
          "rgba(181, 85, 9, 1)",
          "rgba(184, 121, 33, 1)",
          "rgba(183, 172, 63, 1)",
          "rgba(3, 83, 5, 1)",
          "rgba(7, 111, 26, 1)",
          "rgba(42, 146, 20, 1)",
          "rgba(55, 185, 28, 1)",
          "rgba(104, 222, 79, 1)",
          "rgba(168, 232, 154, 1)",
          "rgba(66, 133, 244, 1)",
        ];

        // Create the chart
        new Chart("SolarChart", {
          type: "pie",
          data: {
            labels: xValues,
            datasets: [
              {
                label: "kWh",
                borderColor: borderColors,
                borderWidth: "2",
                backgroundColor: barColors,
                data: yValues,
              },
            ],
          },
          options: {
            legend: { display: true, text: "kWh" },
            plugins: {
              title: {
                display: true,
                text:
                  "UNLV Solar Energy Production " +
                  new Date().toLocaleDateString(),
              },
              legend: { display: false },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Solar-Container">
      <div className="Solar-Canvas">
        <canvas id="SolarChart" role="img"></canvas>
      </div>
      {/* Building Cards */}
      {/* You can render these dynamically based on data */}
    </div>
  );
};
