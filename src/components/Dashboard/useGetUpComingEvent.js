import { useQuery } from "@tanstack/react-query";
import { getUpComingEvent } from "../../services/apiUser";
export function useGetUpComingEvent(userId) {
  const {
    data: upComingEvent,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getUpComingEvent(userId),
    queryKey: ["upComingEvent"],
  });

  return { upComingEvent, isLoading, error };
}
