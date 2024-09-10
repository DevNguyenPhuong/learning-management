import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import dayjs from "dayjs";
import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useCreateSchedule } from "./useCreateSchedule";
import toast from "react-hot-toast";

function ConfirmCreateScheduleModal({ isOpenModal, onCloseModal, dayValue }) {
  const queryClient = useQueryClient();
  const { id } = useSelector((store) => store.user);
  const { createSchedule, isPending } = useCreateSchedule();

  function handleSubmit() {
    createSchedule(
      {
        userId: id,
        content: null,
        startAt: dayjs(dayValue).unix(),
        day: dayjs(dayValue).format("YYYY-MM-DD"),
        endAt: null,
        priority: "MEDIUM",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["schedules"] });
          onCloseModal();
          toast.success(
            `Created schedule for ${dayjs(dayValue).format("DD-MM-YYYY")}`
          );
        },
      }
    );
  }

  return createPortal(
    <Modal
      loading={isPending}
      maskClosable={!isPending}
      className="text-center"
      title="Create new event"
      open={isOpenModal}
      confirmLoading={isPending}
      onCancel={onCloseModal}
      onOk={handleSubmit}
    >
      <p>
        It looks like you don't have any events scheduled for today. Would you
        like to create a new schedule?
      </p>
    </Modal>,
    document.body
  );
}

export default ConfirmCreateScheduleModal;
