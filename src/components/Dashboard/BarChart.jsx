import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { theme } from "antd";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StudyTimeBarChart() {
  const { mode } = useSelector((store) => store.user);
  const {
    token: { colorText },
  } = theme.useToken();
  return (
    <Bar
      data={{
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "Average Study Time (hours)",
            data: [3.5, 4.2, 3.8, 4.0, 3.2, 2.5, 4.5],
            backgroundColor: mode === "light" ? "#6366f1" : "#3730a3",
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Average Study Time per Day",
            font: {
              size: 20,
              weight: "bold",
            },
            padding: {
              top: 10,
              bottom: 30,
            },
            color: colorText,
          },
        },
        scales: {
          y: {
            beginAtZero: true,

            title: {
              display: true,
              text: "Hours",
              color: colorText,
            },
            ticks: {
              beginAtZero: true,
              color: colorText,
            },
            grid: {
              color: mode === "light" ? "#6b72804a" : "#6b728058",
            },
          },

          x: {
            ticks: {
              beginAtZero: true,
              color: colorText,
            },
            grid: {
              color: mode === "light" ? "#6b72804a" : "#6b72807e",
            },
          },
        },
      }}
    />
  );
}

export default StudyTimeBarChart;
