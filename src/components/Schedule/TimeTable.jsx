import { Alert, Calendar } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import TaskModal from "./TaskModal";
import { format } from "date-fns";

function TimeTable() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() =>
    dayjs(format(new Date(), "yyyy-MM-dd"))
  );
  const onSelect = (newValue) => {
    setOpen(true);
    setValue(newValue);
  };
  const onPanelChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Alert message={`You selected date: ${value?.format("DD-MM-YYYY")}`} />
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
      <TaskModal
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        date={value}
      />
    </>
  );
}

export default TimeTable;
