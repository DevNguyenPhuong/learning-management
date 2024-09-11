import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ totalTasksInWeek, totalTasksToday }) {
  const { mode } = useSelector((store) => store.user);
  const data = {
    datasets: [
      {
        label: "Task",
        data: [totalTasksInWeek, totalTasksToday],
        backgroundColor:
          mode === "light" ? ["#86efac", "#7dd3fc"] : ["#16a34a", "#0284c7"],
      },
    ],
    labels: ["week", "today"],
  };

  return (
    <Doughnut
      data={data}
      options={{
        elements: {
          arc: {
            borderWidth: 0,
          },
        },

        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}

export default DoughnutChart;
