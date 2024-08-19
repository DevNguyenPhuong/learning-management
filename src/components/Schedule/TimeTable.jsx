import { Button, Calendar, Spin } from "antd";
import { format } from "date-fns";
import dayjs from "dayjs";
import React, { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { useSelector } from "react-redux";
import CreateEventModal from "./CreateEventModal";
import TaskModal from "./TaskModal";
import { useGetSchedule } from "./useGetSchedule";

function TimeTable() {
  const [open, setOpen] = useState(false);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [value, setValue] = useState(() =>
    dayjs(format(new Date(), "yyyy-MM-dd"))
  );

  const { id } = useSelector((store) => store.user);
  const { schedules, isLoading } = useGetSchedule(id);
  const [selectedScheduleId, setSelectedSheduleId] = useState();

  const onSelect = (newValue, scheduleId) => {
    if (newValue.format("YYYY-MM-DD") !== value.format("YYYY-MM-DD"))
      setOpen(false);
    else setOpen(true);
    setValue(newValue);
    setSelectedSheduleId(scheduleId);
    // navigate(`/schedules/${scheduleId}`);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const findEventInSchedule = (date) => {
    return schedules?.find((item) => item.date === date) || null;
  };

  const dateCellRender = (value) => {
    const cellDate = dayjs(value).format("DD-MM-YYYY");
    const cellData = findEventInSchedule(cellDate);
    if (isLoading)
      return (
        <div className="pb-4 h-full flex justify-center items-center">
          <Spin />
        </div>
      );
    if (cellData)
      return (
        <div
          className="flex flex-col"
          onClick={() => onSelect(value, cellData?.id)}
        >
          <div
            className={`w-full h-1 mb-2 ${
              cellData?.priority === "medium" ? "bg-indigo-700" : "bg-red-700"
            }`}
          ></div>
          <div className=" whitespace-normal overflow-wrap-anywhere">
            {cellData.content}
          </div>
        </div>
      );
    return <div className="size-full" onClick={() => onSelect(value)}></div>;
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <Button
        type="primary"
        icon={<HiOutlinePlus />}
        className="ml-2 mt-2"
        onClick={() => setOpenEventModal(true)}
      >
        Add event
      </Button>
      <Calendar
        className="min-w-[800px]"
        cellRender={cellRender}
        value={value}
        // onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
      <TaskModal
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        date={dayjs(value).format("DD-MM-YYYY")}
        scheduleId={selectedScheduleId}
      />
      <CreateEventModal
        isOpenModal={openEventModal}
        onCloseModal={() => setOpenEventModal(false)}
      />
    </>
  );
}

export default TimeTable;
