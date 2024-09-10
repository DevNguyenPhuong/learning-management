import { useQueryClient } from "@tanstack/react-query";
import { DatePicker, Form, Input, Modal, Radio } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useCreateSchedule } from "./useCreateSchedule";
import { useGetSchedule } from "./useGetSchedule";

function CreateEventModal({ isOpenModal, onCloseModal }) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { id } = useSelector((store) => store.user);
  const { createSchedule, isPending } = useCreateSchedule();
  const { schedules, isLoading } = useGetSchedule(id);

  function handleSubmit(event) {
    createSchedule(
      {
        ...event,
        userId: id,
        startAt: dayjs(event.date).unix(),
        day: dayjs(event.date).format("YYYY-MM-DD"),
        endAt: null,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["schedules"] });
          queryClient.invalidateQueries({ queryKey: ["upComingEvent"] });
          form.resetFields();
          onCloseModal();
        },
      }
    );
  }

  const disabledDate = (current) => {
    // Disable dates before today
    if (current && current < moment().startOf("day")) return true;

    // Disable dates that exist in the schedule
    return schedules.some((schedule) => {
      return current
        .startOf("day")
        .isSame(moment(schedule.startAt).startOf("day"), "day");
    });
  };

  return createPortal(
    <Modal
      loading={isLoading}
      maskClosable={!isPending}
      className="text-center"
      title="Create new event"
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
      }}
      open={isOpenModal}
      confirmLoading={isPending}
      onCancel={onCloseModal}
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="basic"
          clearOnDestroy
          onFinish={(values) => handleSubmit(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        className="mb-8 mt-8"
        label="Date"
        name="date"
        rules={[
          {
            required: true,
            message: "Plz choose the date for event!",
          },
        ]}
      >
        <DatePicker
          disabledDate={disabledDate}
          format={"DD-MM-YYYY"}
          className="w-full"
        />
      </Form.Item>
      <Form.Item
        className="mb-8 mt-8"
        label="Content"
        name="content"
        rules={[
          {
            required: true,
            message: " Plz enter content of the event!",
          },
        ]}
      >
        <Input placeholder="event" disabled={isPending} />
      </Form.Item>

      <Form.Item
        name="priority"
        className="mb-8 mt-8 text-left"
        rules={[
          {
            required: true,
            message: "Plz chose the priority",
          },
        ]}
      >
        <Radio.Group disabled={isPending}>
          <Radio value="MEDIUM">Medium</Radio>
          <Radio value="HIGH">High</Radio>
          <Radio value="SPECIAL">Special</Radio>
        </Radio.Group>
      </Form.Item>
    </Modal>,
    document.body
  );
}

export default CreateEventModal;
