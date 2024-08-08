import { Form, Input, Modal } from "antd";
import React from "react";
import { createPortal } from "react-dom";
import TipTap from "./TipTap";
import { format } from "date-fns";

function CreateNoteModal({ isOpenModal, closeModal }) {
  const [form] = Form.useForm();

  function handleSubmit(values) {
    console.log(values);
  }

  return createPortal(
    <Modal
      className="text-center"
      title={`${format(new Date(), "dd MMM yyyy, hh:mm")}`}
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
      }}
      open={isOpenModal}
      // confirmLoading={isPending}
      onCancel={closeModal}
      modalRender={(dom) => (
        <Form
          initialvalues={{
            role: "user",
          }}
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
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Plz enter title for the note!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className="mb-8 mt-8"
        name="note"
        rules={[
          {
            required: true,
            message: "Plz enter content of the note!",
          },
        ]}
      >
        <TipTap />
      </Form.Item>
    </Modal>,
    document.body
  );
}

export default CreateNoteModal;
