import { DatePicker, Form, Input, Modal, Radio } from "antd";
import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useCreateEvent } from "./useCreateEvent";
import dayjs from "dayjs";

function CreateEventModal({ isOpenModal, onCloseModal }) {
  const [form] = Form.useForm();
  const { id } = useSelector((store) => store.user);
  const { createEvent, isPending } = useCreateEvent();

  function handleSubmit(event) {
    createEvent({
      userId: id,
      event: {
        ...event,
        date: dayjs(event.date).format("DD-MM-YYYY"),
      },
    });
  }
  return createPortal(
    <Modal
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
        <DatePicker format={"DD-MM-YYYY"} className="w-full" />
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
        name="role"
        className="mb-8 mt-8 text-left"
        rules={[
          {
            required: true,
            message: "Plz chose the priority",
          },
        ]}
      >
        <Radio.Group disabled={isPending}>
          <Radio value="medium">Medium</Radio>
          <Radio value="high">High</Radio>
          <Radio value="special">Special</Radio>
        </Radio.Group>
      </Form.Item>
    </Modal>,
    document.body
  );
}

export default CreateEventModal;
