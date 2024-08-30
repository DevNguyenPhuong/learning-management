import { Button, Calendar, Result, Spin } from "antd";
import { format } from "date-fns";
import dayjs from "dayjs";
import React, { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmCreateScheduleModal from "./ConfirmCreateScheduleModal";
import CreateEventModal from "./CreateEventModal";
import { useGetSchedule } from "./useGetSchedule";

function TimeTable() {
  const { id } = useSelector((store) => store.user);
  const { schedules, isLoading, error } = useGetSchedule(id);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [value, setValue] = useState(() =>
    dayjs(format(new Date(), "yyyy-MM-dd"))
  );

  if (error)
    return (
      <Result
        className="mt-8"
        status="error"
        title="Cannot load data"
        subTitle="Plz check your internet connection and try again!"
      ></Result>
    );

  const onSelect = (newValue, scheduleId) => {
    if (newValue.format("YYYY-MM-DD") !== value.format("YYYY-MM-DD"))
      setOpen(false);
    else {
      if (!scheduleId) setOpenConfirm(true);
      else navigate(`/schedules/${scheduleId}`);
    }
    setValue(newValue);
  };

  const findEventInSchedule = (date) => {
    return (
      schedules?.find(
        (item) => dayjs(item.startAt).format("DD-MM-YYYY") === date
      ) || null
    );
  };

  const dateCellRender = (value) => {
    if (isLoading)
      return (
        <div className="pb-4 h-full flex justify-center items-center">
          <Spin />
        </div>
      );

    const cellDate = dayjs(value).format("DD-MM-YYYY");
    const cellData = findEventInSchedule(cellDate);

    if (cellData)
      return (
        <div
          className="size-full flex flex-col relative"
          onClick={() => onSelect(value, cellData?.id)}
        >
          {/* <FaTimes className="absolute right-1 top-2" /> */}
          <div
            className={` w-full h-1 mb-2 
            ${
              cellData?.priority === "MEDIUM" &&
              cellData?.content &&
              "bg-indigo-700"
            } 
            ${cellData?.priority === "HIGH" && "bg-red-700"} 
            ${cellData?.priority === "SPECIAL" && "bg-orange-700"}
            `}
          ></div>
          <div className="pt-2 overflow-scroll no-scrollbar  h-full whitespace-normal overflow-wrap-anywhere">
            {cellData?.content}
          </div>
        </div>
      );
    return <div className="size-full" onClick={() => onSelect(value)}></div>;
  };

  return (
    <>
      <Button
        type="primary"
        icon={<HiOutlinePlus />}
        className="ml-2 mt-2"
        onClick={() => setOpen(true)}
      >
        Add event
      </Button>
      <Calendar
        className="min-w-[800px]"
        cellRender={(current) => dateCellRender(current)}
        value={value}
        onPanelChange={(newValue) => setValue(newValue)}
      />
      <CreateEventModal
        isOpenModal={open}
        onCloseModal={() => setOpen(false)}
      />
      <ConfirmCreateScheduleModal
        isOpenModal={openConfirm}
        onCloseModal={() => setOpenConfirm(false)}
        dayValue={value}
      />
    </>
  );
}

export default TimeTable;
