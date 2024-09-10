import { Button } from "antd";
import { useState } from "react";
import { FaArrowLeft, FaBattleNet, FaPlus } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import CreateTaskModal from "../Tasks/CreateTaskModal";
import TasksList from "../Tasks/TasksList";
import AssistantModal from "./AssistantModal";

function Schedule() {
  const [open, setOpen] = useState(false);
  const [OpenAssistant, setOpenAssistant] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <Button
        className="mt-2 ml-2 mr-4"
        type="primary"
        icon={<FaArrowLeft />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <Button
        className="mt-2 ml-2 mr-4"
        type="primary"
        icon={<FaPlus />}
        onClick={() => setOpen(true)}
      >
        Add tasks
      </Button>

      <Button
        className="mt-2 ml-2"
        type="primary"
        icon={<FaBattleNet />}
        onClick={() => setOpenAssistant(true)}
      >
        Assistant
      </Button>

      <TasksList />
      <CreateTaskModal isOpenModal={open} onCloseModal={() => setOpen(false)} />
      <AssistantModal
        isOpenModal={OpenAssistant}
        onCloseModal={() => setOpenAssistant(false)}
      />
    </div>
  );
}

export default Schedule;
