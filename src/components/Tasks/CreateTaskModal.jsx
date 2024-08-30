import { useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, TimePicker } from "antd";
import React from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { useCreateTask } from "./useCreateTask";
import { STATUS } from "../../Utils/constants";

function CreateTaskModal({ isOpenModal, onCloseModal }) {
  const { scheduleId } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { createTask, isPending } = useCreateTask();

  function handleSubmit(event) {
    createTask(
      {
        ...event,
        scheduleId,
        completed: false,
        status: STATUS.IS_PENDING,
        startAt: null,
        completedAt: null,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [`Schedule`, scheduleId] });
          form.resetFields();
          onCloseModal();
        },
      }
    );
  }

  return createPortal(
    <Modal
      maskClosable={!isPending}
      className="text-center"
      title="Create new task"
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
          name="create-task-form"
          clearOnDestroy
          onFinish={(values) => handleSubmit(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        className="mb-8 mt-8"
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: " Plz enter title of the task!",
          },
        ]}
      >
        <Input placeholder="Enter somethings" disabled={isPending} />
      </Form.Item>

      <Form.Item
        className="mb-8 mt-8 text-left"
        label="Duration"
        name="duration"
        rules={[
          {
            required: true,
            message: " Plz choose duration for the task!",
          },
        ]}
      >
        <TimePicker changeOnScroll needConfirm={false} />
      </Form.Item>
    </Modal>,
    document.body
  );
}

export default CreateTaskModal;
