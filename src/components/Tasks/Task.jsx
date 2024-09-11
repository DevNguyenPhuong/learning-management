import { theme } from "antd";
import { useState } from "react";
import { FaPlay, FaRedoAlt, FaTimes } from "react-icons/fa";
import { HiOutlineCheck, HiOutlineClock } from "react-icons/hi";
import { useSelector } from "react-redux";
import { STATUS } from "../../Utils/constants.js";
import { estimateCompletedAt, timeLeft } from "../../Utils/helpers.js";
import CountdownClock from "./CountdownClock.jsx";
import { useDeleteTask } from "./useDeleteTask";
import { useUpdateTask } from "./useUpdateTask.js";

function Task({ task }) {
  const { deleteTask, isPending } = useDeleteTask();
  const { id, title, completed, status, startAt, duration } = task;

  const { mode } = useSelector((store) => store.user);
  const { updateTask, isPending: isPendingUpdate } = useUpdateTask(id);

  const [isCountdownStarted, setIsCountdownStarted] = useState(true);

  let timeLeftTask;
  if (isCountdownStarted)
    timeLeftTask = timeLeft(
      estimateCompletedAt(
        startAt || new Date(Date.now()).toISOString(),
        duration
      )
    );
  function handleComplete() {
    const updatedTask = {
      ...task,
      completed: !completed,
    };

    if (updatedTask.completed) {
      updatedTask.completedAt = new Date(Date.now());
      updatedTask.status = STATUS.COMPLETED;
    } else {
      updatedTask.completedAt = null;
      updatedTask.status = STATUS.PROCESSING;
    }
    updateTask(updatedTask);
  }

  function handleStart() {
    const now = new Date(Date.now());
    updateTask({
      ...task,
      startAt: now,
      status: STATUS.PROCESSING,
    });
    setIsCountdownStarted(true);
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
          <div className="flex items-center justify-between text-gray-800 gap-2">
            <div className="mt-3 mb-3 flex items-center">
              <div
                className="border border-gray-700  rounded-full px-3 py-1  text-gray-600 text-xs flex items-center"
                aria-label="due on"
                role="contentinfo"
              >
                <HiOutlineClock />

                <div className="ml-2 ">
                  {status === STATUS.TIMEOUT && "Time out"}
                  {status === STATUS.IS_PENDING && duration}
                  {status === STATUS.COMPLETED && "Completed"}
                  {status === STATUS.PROCESSING && isCountdownStarted && (
                    <CountdownClock
                      timeLeftTask={timeLeftTask}
                      onTimeout={() =>
                        updateTask({ ...task, status: STATUS.TIMEOUT })
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {status === STATUS.PROCESSING && (
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
              )}
              {status === STATUS.IS_PENDING && (
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
              )}

              {status === STATUS.TIMEOUT && (
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
                  <FaRedoAlt className="size-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
