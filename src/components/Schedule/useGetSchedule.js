import { useQuery } from "@tanstack/react-query";
import { getUserSchedules as getUserSchedulesAPI } from "../../services/apiUser";
export function useGetSchedule(userId) {
  const {
    data: schedules,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getUserSchedulesAPI(userId),
    queryKey: ["schedules"],
  });

  return { schedules, isLoading, error };
}
