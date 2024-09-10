import { Result, Spin } from "antd";
import { getISOWeek } from "date-fns";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { useGetWeekSchedules } from "./useGetWeekSchedules";
import { calculateTaskStatusCounts } from "../../Utils/helpers";

function TodayTaskStatusBox() {
  const { id } = useSelector((store) => store.user);
  const { weekSchedules, isLoading, error } = useGetWeekSchedules(
    id,
    getISOWeek(new Date())
  );

  if (isLoading)
    return (
      <section
        className="min-w-[25rem] flex items-center justify-center  rounded-xl   shadow-chart sm:gap-6 sm:p-6 "
        style={{
          boxShadow:
            " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
        }}
      >
        <Spin className="flex items-center justify-center"></Spin>
      </section>
    );

  if (error)
    return (
      <section
        className="min-w-[25rem] flex items-center justify-center gap-4 rounded-xl   p-4 shadow-chart sm:gap-6 sm:p-6 "
        style={{
          boxShadow:
            " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
        }}
      >
        <Result
          status="error"
          title="Cannot load data"
          subTitle="Plz check your internet connection and try again!"
        ></Result>
      </section>
    );

  let TIMEOUT, IN_PROCESS, COMPLETED, IS_PENDING;

  if (weekSchedules) {
    // Destructure the returned object from the function
    ({ TIMEOUT, IN_PROCESS, COMPLETED, IS_PENDING } =
      calculateTaskStatusCounts(weekSchedules));
  }

  return (
    <section
      className="flex rounded-xl p-2 shadow-chart sm:gap-4 sm:p-4 "
      style={{
        boxShadow:
          " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
      }}
    >
      <div className="  flex flex-col justify-center mr-1  font-bold ">
        {"TODAY".split("").map((letter, index) => (
          <span key={index} className="my-1">
            {letter}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 ">
        <div className="flex gap-2  justify-center items-center p-4 rounded-lg shadow">
          <p className="text-sm font-medium ">Completed:</p>
          <div className=" font-semibold ">
            <CountUp end={COMPLETED} />
          </div>
        </div>
        <div className="flex gap-2  justify-center items-center p-4 rounded-lg shadow">
          <p className="text-sm font-medium ">Time out:</p>
          <div className=" font-semibold ">
            <CountUp end={TIMEOUT} />
          </div>
        </div>
        <div className="flex gap-2  justify-center items-center p-4 rounded-lg shadow">
          <p className="text-sm font-medium ">Pending:</p>
          <div className=" font-semibold ">
            <CountUp end={IS_PENDING} />
          </div>
        </div>
        <div className="flex gap-2  justify-center items-center p-4 rounded-lg shadow">
          <p className="text-sm font-medium ">Processing:</p>
          <div className=" font-semibold ">
            <CountUp end={IN_PROCESS} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TodayTaskStatusBox;
