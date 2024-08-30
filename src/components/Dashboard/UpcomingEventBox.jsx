import { useSelector } from "react-redux";
import { useGetUpComingEvent } from "./useGetUpComingEvent";
import { Empty, Result, Spin } from "antd";
import { format, parseISO } from "date-fns";

function UpcomingEvenBox() {
  const { id } = useSelector((store) => store.user);
  const { upComingEvent, isLoading, error } = useGetUpComingEvent(id);
  if (isLoading)
    return (
      <section
        className="min-w-[25rem] flex items-center justify-center gap-4 rounded-xl   p-4 shadow-chart sm:gap-6 sm:p-6 "
        style={{
          boxShadow:
            " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
        }}
      >
        <Spin></Spin>
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

  if (!upComingEvent.content)
    return (
      <section
        className="min-w-[25rem] flex items-center justify-center gap-4 rounded-xl   p-4 shadow-chart sm:gap-6 sm:p-6 "
        style={{
          boxShadow:
            " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
        }}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-[18px] leading-[22px] font-semibold ">
            Upcoming event
          </h2>
          <Empty></Empty>
        </div>
      </section>
    );

  return (
    <section
      className="flex items-center gap-4 rounded-xl   p-4 shadow-chart sm:gap-6 sm:p-6 "
      style={{
        boxShadow:
          " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
      }}
    >
      <div className="flex flex-col h-full gap-6">
        <h2 className="text-[18px] leading-[22px] font-semibold ">
          Upcoming event:{" "}
          {format(parseISO(upComingEvent?.startAt), "EEEE dd/MM/yyyy")}
        </h2>
        <div className="flex h-full items-center gap-2">
          <div
            className={`    ${
              upComingEvent?.priority === "MEDIUM" && "bg-indigo-700"
            } 
            ${upComingEvent?.priority === "HIGH" && "bg-red-700"} 
            ${
              upComingEvent?.priority === "SPECIAL" && "bg-orange-700"
            }  w-1 h-full`}
          ></div>
          <div className="text-24 lg:text-30 flex-1 font-semibold flex-center gap-2">
            {upComingEvent?.content}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvenBox;
