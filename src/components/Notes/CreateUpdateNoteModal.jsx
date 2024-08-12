import { Form, Input, Modal } from "antd";
import { format } from "date-fns";
import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import TipTap from "./TipTap";
import { useCreateUpdateNote } from "./useCreateUpdateNote";

function CreateUpdateNoteModal({
  isOpenModal,
  onCloseModal,
  currentNoteData,
  type,
}) {
  const [form] = Form.useForm();
  const { id } = useSelector((store) => store.user);
  const { createUpdateNote, isPending } = useCreateUpdateNote(onCloseModal);

  function handleSubmit(values) {
    console.log(type);
    if (type === "update")
      createUpdateNote({
        note: {
          ...values,
          bookmarked: false,
          userId: id,
          date: format(new Date(), "MMMM d, yyyy"),
          time: format(new Date(), "HH:mm"),
        },
        type: type,
        updateNoteId: currentNoteData?.id,
      });
    if (type === "create") {
      createUpdateNote({
        note: {
          ...values,
          bookmarked: false,
          userId: id,
          date: format(new Date(), "MMMM d, yyyy"),
          time: format(new Date(), "HH:mm"),
        },
        type: type,
      });
      form.resetFields();
    }
  }

  return createPortal(
    <Modal
      maskClosable={!isPending}
      className="text-center"
      title={`${format(new Date(), "dd MMM yyyy, hh:mm")}`}
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
      }}
      afterOpenChange={(visible) => {
        if (visible && currentNoteData) {
          form.setFieldsValue({
            title: currentNoteData.title,
            content: currentNoteData.content,
          });
        }
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
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Plz enter title for the note!",
          },
        ]}
      >
        <Input disabled={isPending} />
      </Form.Item>

      <Form.Item
        className="mb-8 mt-8"
        name="content"
        rules={[
          {
            required: true,
            message: "Plz enter content of the note!",
          },
        ]}
      >
        <TipTap note={currentNoteData?.content} />
      </Form.Item>
    </Modal>,
    document.body
  );
}

export default CreateUpdateNoteModal;
