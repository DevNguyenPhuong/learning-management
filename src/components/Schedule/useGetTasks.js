import { useQuery } from "@tanstack/react-query";
import { getScheduleTasks as getScheduleTasksAPI } from "../../services/apiSchedule";

export function useGetTasks(scheduleId) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getScheduleTasksAPI(scheduleId),
    queryKey: [`Schedule`, scheduleId],
  });

  return { tasks, isLoading, error };
}
