import { Form, Input, InputNumber, Modal, Spin } from "antd";
import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useGetUpComingEvent } from "../Dashboard/useGetUpComingEvent";
import SuggestedTask from "../Tasks/SuggestedTask";
import { useCreateGeminiResponse } from "./useCreateGeminiResponse";

function AssistantModal({ isOpenModal, onCloseModal }) {
  const { id } = useSelector((store) => store.user);
  const [form] = Form.useForm();
  const { createGeminiResponse, isPending, data } = useCreateGeminiResponse();
  const { upComingEvent, isLoading } = useGetUpComingEvent(id);

  function handleSubmit(value, isTryAnother = false) {
    let customRequest;
    if (isTryAnother) {
      customRequest = `Try another set of tasks for "${value.objective}" (notice that I only have ${value.studyTime} hours to study). List of tasks should be demonstrated as an array of JSON objects, each containing task name and duration.`;
    } else {
      customRequest = `I have an event called: "${value.objective}". Create a list of tasks (include tasks name and duration, I can only have ${value.studyTime} hours to study in this day), for me to prepare for it. The list of tasks should be demonstrated as an array of JSON objects.`;
    }

    createGeminiResponse(customRequest);
  }
  function handleTryAnother() {
    form
      .validateFields()
      .then((values) => {
        handleSubmit(values, true);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  }

  return createPortal(
    <Modal
      loading={isLoading}
      maskClosable={!isLoading}
      className="text-center"
      title="Plan my day"
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
      }}
      okText="Suggest me"
      open={isOpenModal}
      confirmLoading={isLoading}
      afterOpenChange={(visible) => {
        if (visible && upComingEvent) {
          form.setFieldsValue({
            objective: upComingEvent?.content || "",
          });
        }
      }}
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
        label="Objective"
        name="objective"
        rules={[
          {
            required: true,
            message: "Plz choose your objective of the day!",
          },
        ]}
      >
        <Input placeholder="objective" disabled={isLoading} />
      </Form.Item>
      <Form.Item
        className="mb-8 mt-8"
        label="Study time"
        name="studyTime"
        rules={[
          {
            type: "number",
            min: 2,
            max: 24,
            message: "Study time must be between 2 and 24",
          },
          {
            required: true,
            message: "How many hours you can spend for this day ?",
          },
        ]}
      >
        <InputNumber
          disabled={isLoading}
          placeholder="Study time"
          style={{ width: "100%" }}
        />
      </Form.Item>
      <div className="flex items-center justify-center flex-col ">
        {isPending && <Spin />}
        {data?.length === 0 || (!data && <p>Suggested tasks appear here</p>)}
        {data?.length !== 0 && data && (
          <>
            <p className="mb-4">
              There are fews tasks we suggested for you,{" "}
              <button
                className="text-indigo-500 italic hover:cursor-pointer"
                onClick={handleTryAnother}
                type="button"
              >
                Try another ?
              </button>
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 h-[15rem] overflow-scroll no-scrollbar">
              {data?.map((item) => {
                return <SuggestedTask key={item.task} {...item} />;
              })}
            </ul>
          </>
        )}
      </div>
    </Modal>,
    document.body
  );
}

export default AssistantModal;
