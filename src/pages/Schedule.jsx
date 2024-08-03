import React, { useState } from "react";
import { Alert, Calendar } from "antd";
import { format } from "date-fns";

function Schedule() {
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Alert message={`You selected date: ${selectedValue}`} />
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </>
  );
}
export default Schedule;
