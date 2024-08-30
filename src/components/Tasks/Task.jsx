import { theme } from "antd";
import { FaPlay, FaTimes } from "react-icons/fa";
import { HiOutlineCheck, HiOutlineClock } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDeleteTask } from "./useDeleteTask";
import { useUpdateTask } from "./useUpdateTask.js";

function Task({ task }) {
  const { deleteTask, isPending } = useDeleteTask();
  const {
    id,
    title,
    completed,
    scheduleId,
    status,
    completedAt,
    startAt,
    duration,
  } = task;
  const { mode } = useSelector((store) => store.user);
  const { updateTask, isPending: isPendingUpdate } = useUpdateTask(id);

  function handleComplete() {
    const updatedTask = {
      ...task,
      completed: !completed,
    };

    if (updatedTask.completed) updatedTask.completedAt = new Date();
    else updateTask.completedAt = null;

    updateTask(updatedTask);
  }

  function handleStart() {
    updateTask({
      ...task,
      startAt: new Date(),
    });
  }

  const {
    token: { colorText },
  } = theme.useToken();
  return (
    <>
      <div
        style={{
          color: colorText,
          background: `${mode === "dark" ? "#18181b" : "#f4f4f5"}`,
          boxShadow:
            " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
        }}
        className=" size-48 flex flex-col justify-between   rounded-lg  mb-6 pt-5 px-4 relative"
      >
        <button
          className="absolute right-2 top-2"
          onClick={() => deleteTask(id)}
          disabled={isPending || isPendingUpdate}
        >
          <FaTimes className="hover:cursor-pointer hover:text-red-500 transition-all duration-300" />
        </button>

        <p className="overflow-scroll no-scrollbar font-semibold w-11/12 whitespace-normal overflow-wrap-anywhere">
          {title}
        </p>

        <div>
          <div className="flex items-center justify-between text-gray-800 ">
            <div className="mt-3 mb-3 flex items-center">
              <div
                className="border border-gray-700  rounded-full px-3 py-1  text-gray-600 text-xs flex items-center"
                aria-label="due on"
                role="contentinfo"
              >
                <HiOutlineClock />
                <p className="ml-2 "> 11:45</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className={`w-8 h-8 rounded-full border 
                 border-gray-800  ${
                   completed && "bg-gray-600"
                 }  flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 `}
                aria-label="edit note"
                style={{
                  color: colorText,
                }}
                onClick={handleComplete}
                disabled={isPendingUpdate || isPending}
              >
                <HiOutlineCheck />
              </button>
              <button
                className={`w-8 h-8 rounded-full border 
                 border-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 `}
                aria-label="edit note"
                style={{
                  color: colorText,
                }}
                onClick={handleStart}
                disabled={isPendingUpdate || isPending}
              >
                <FaPlay className="size-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
