import { Button } from "antd";
import { useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import CreateTaskModal from "../components/Tasks/CreateTaskModal";
import TasksList from "../components/Tasks/TasksList";
import { useNavigate } from "react-router-dom";

function Schedule() {
  const [open, setOpen] = useState(false);
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
        className="mt-2 ml-2"
        type="primary"
        icon={<FaPlus />}
        onClick={() => setOpen(true)}
      >
        Add tasks
      </Button>

      <TasksList />
      <CreateTaskModal isOpenModal={open} onCloseModal={() => setOpen(false)} />
    </div>
  );
}

export default Schedule;
