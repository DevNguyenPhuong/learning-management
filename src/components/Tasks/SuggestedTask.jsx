import { theme } from "antd";
import { FaTimes } from "react-icons/fa";
import { HiOutlineCheck, HiOutlineClock } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useCreateTask } from "./useCreateTask";
import { useParams } from "react-router-dom";
import { STATUS } from "../../Utils/constants";
import { useQueryClient } from "@tanstack/react-query";
function SuggestedTask({ task, duration }) {
  const {
    token: { colorText },
  } = theme.useToken();
  const { mode } = useSelector((store) => store.user);
  const { createTask, isPending } = useCreateTask();
  const { scheduleId } = useParams();
  const queryClient = useQueryClient();

  function handleDeleteTask() {}
  function handleCreateTask() {
    createTask(
      {
        title: task,
        duration,
        scheduleId,
        completed: false,
        status: STATUS.IS_PENDING,
        startAt: null,
        completedAt: null,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [`Schedule`, scheduleId] });
        },
      }
    );
  }
  return (
    <li>
      <div
        style={{
          color: colorText,
          background: `${mode === "dark" ? "#18181b" : "#f4f4f5"}`,
          boxShadow:
            " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
        }}
        className=" size-48 flex flex-col justify-between   rounded-lg  pt-5 px-4 relative"
      >
        <button
          className="absolute right-2 top-2"
          onClick={() => handleDeleteTask()}
          disabled={isPending}
          type="button"
        >
          <FaTimes className="hover:cursor-pointer hover:text-red-500 transition-all duration-300" />
        </button>

        <p className="overflow-scroll no-scrollbar font-semibold w-11/12 whitespace-normal overflow-wrap-anywhere">
          {task}
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
                <p className="ml-2 ">{duration}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className={`w-8 h-8 rounded-full border 
                 border-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 hover:border-gray-600 transition-all duration-300 `}
                aria-label="edit note"
                style={{
                  color: colorText,
                }}
                onClick={handleCreateTask}
                disabled={isPending}
                type="button"
              >
                <HiOutlineCheck />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default SuggestedTask;
