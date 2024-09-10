import { Result, Spin, theme } from "antd";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { getISOWeek } from "date-fns";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useGetWeekSchedules } from "./useGetWeekSchedules.js";
import { calculateStudyTime } from "../../Utils/helpers.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const { mode, id } = useSelector((store) => store.user);
  const {
    token: { colorText },
  } = theme.useToken();

  const { weekSchedules, isLoading, error } = useGetWeekSchedules(
    id,
    getISOWeek(new Date())
  );

  if (isLoading)
    return (
      <Spin className="min-h-[25rem] flex items-center justify-center"></Spin>
    );

  if (error)
    return (
      <Result
        status="error"
        title="Cannot load data"
        subTitle="Plz check your internet connection and try again!"
      ></Result>
    );

  let studyTime;
  if (weekSchedules) studyTime = calculateStudyTime(weekSchedules);

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
            data: studyTime,
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

export default BarChart;
