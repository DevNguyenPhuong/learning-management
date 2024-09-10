import { theme } from "antd";
import BarChart from "../components/Dashboard/BarChart";
import TotalTaskBox from "../components/Dashboard/TotalTaskBox";
import HeaderBox from "../components/UI/HeaderBox";
import UpcomingEvenBox from "../components/Dashboard/UpcomingEventBox";
import { useSelector } from "react-redux";
import TodayTaskStatusBox from "../components/Dashboard/TodayTaskStatusBox";
function Dashboard() {
  const {
    token: { colorText },
  } = theme.useToken();
  const { full_name } = useSelector((store) => store.user);

  return (
    <section className="flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll no-scrollbar">
      <div
        style={{ color: colorText }}
        className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-4 lg:py-6 xl:max-h-screen xl:overflow-y-scroll"
      >
        <header className="no-scrollbar flex flex-col justify-between gap-8">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={full_name}
            subtext="Access and manage works and day efficiently."
          />

          <div className="flex flex-wrap gap-8">
            <TotalTaskBox />
            <TodayTaskStatusBox />
            <UpcomingEvenBox />
          </div>
        </header>

        <BarChart />
      </div>
    </section>
  );
}

export default Dashboard;
