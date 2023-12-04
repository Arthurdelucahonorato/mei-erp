import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  BarOptions,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {},
    },
  },
};

type BarChartProps = {
  labels: string[];
  data: number[];
};

export function BarChart({ data, labels }: BarChartProps) {

  const chartData = {
    labels,
    borderWidth: 1,
    datasets: [
      {
        label: "Receitas mensais",
        data: data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "'rgb(255, 99, 132)'",
      },
    ],
  };

  return <Bar className="w-full" options={options} data={chartData} />;
}
