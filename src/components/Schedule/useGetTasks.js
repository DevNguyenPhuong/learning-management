import { useQuery } from "@tanstack/react-query";
import { getScheduleTasks as getScheduleTasksAPI } from "../../services/apiSchedule";

export function useGetTasks(scheduleId) {
  let checkedFields = {};
  const modifiedTasks = [];
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getScheduleTasksAPI(scheduleId),
    queryKey: [`Schedule ${scheduleId}`],
  });

  if (tasks) {
    tasks.forEach((item, index) => {
      modifiedTasks.push(item.content);
      checkedFields = {
        ...checkedFields,
        [index]: item.isChecked,
      };
    });
  }

  return { modifiedTasks, checkedFields, isLoading, error };
}
