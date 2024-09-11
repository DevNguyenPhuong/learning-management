import { useQuery } from "@tanstack/react-query";
import { getWeekSchedules } from "../../services/apiUser";

export function useGetWeekSchedules(userId, week) {
  const {
    data: weekSchedules,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getWeekSchedules(userId, week),
    queryKey: ["weekSchedules", week],
  });

  return { weekSchedules, isLoading, error };
}
