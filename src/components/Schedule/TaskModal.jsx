import React from "react";
import { Button, Modal } from "antd";
import Tasks from "../../pages/Tasks";

function TaskModal({ open, onOpen, onClose }) {
  return (
    <>
      <Modal
        title={<p>Loading Modal</p>}
        footer={<Button type="primary">Reload</Button>}
        // loading={loading}
        open={open}
        onCancel={onClose}
      >
        <Tasks />
      </Modal>
    </>
  );
}

export default TaskModal;
