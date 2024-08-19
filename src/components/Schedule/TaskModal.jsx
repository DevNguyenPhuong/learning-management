import { Button, Form, Modal } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import TaskList from "../Tasks/TaskList";
import { useGetTasks } from "./useGetTasks.js";

function TaskModal({ open, onOpen, onClose, date, scheduleId }) {
  const [form] = Form.useForm();
  const { modifiedTasks, checkedFields, isLoading, error } =
    useGetTasks(scheduleId);
  const [disabledFields, setDisabledFields] = useState({});

  useEffect(() => {
    if (
      Object.keys(checkedFields).length > 0 &&
      JSON.stringify(checkedFields) !== JSON.stringify(disabledFields)
    ) {
      setDisabledFields(checkedFields);
    }
  }, [checkedFields, disabledFields]);

  if (isLoading) return null;
  if (error) return null;

  if (!scheduleId)
    return (
      <Modal
        title={date}
        footer={<Button type="primary">Save</Button>}
        // loading={loading}
        open={open}
        onCancel={onClose}
        modalRender={(dom) => (
          <Form clearOnDestroy name="manage-tasks-form" onFinish={onFinish}>
            {dom}
          </Form>
        )}
      ></Modal>
    );

  function onFinish(values) {
    console.log(values);
    console.log(disabledFields);
  }

  return (
    <Modal
      title={date}
      // loading={loading}
      open={open}
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
      }}
      afterOpenChange={(visible) => {
        if (visible) {
          form.setFieldsValue({
            tasks: modifiedTasks,
          });
        }
      }}
      okText="Save"
      onCancel={onClose}
      modalRender={(dom) => (
        <Form
          form={form}
          clearOnDestroy
          name="manage-tasks-form"
          onFinish={onFinish}
        >
          {dom}
        </Form>
      )}
    >
      <TaskList
        disabledFields={disabledFields}
        setDisabledFields={setDisabledFields}
      />
    </Modal>
  );
}

export default TaskModal;
