import CountUp from "react-countup";
import DoughnutChart from "./DoughnutChart";

function TotalTaskBox() {
  return (
    <section
      className="flex w-full items-center gap-4 rounded-xl   p-4 shadow-chart sm:gap-6 sm:p-6 "
      style={{
        boxShadow:
          " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
      }}
    >
      <div className="flex size-full max-w-[100px] items-center sm:max-w-[120px]">
        <DoughnutChart />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-[18px] leading-[22px] font-semibold ">
          Total tasks in this week: <CountUp end={16} />
        </h2>
        <div className="flex  gap-2">
          <p className="text-md font-medium ">Total Current tasks:</p>
          <div className="text-24 lg:text-30 flex-1 font-semibold  flex-center gap-2">
            <CountUp end={8} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TotalTaskBox;
