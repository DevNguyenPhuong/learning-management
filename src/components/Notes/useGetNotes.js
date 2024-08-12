import { useQuery } from "@tanstack/react-query";
import { getUserNotes } from "../../services/apiUser";
export function useGetNotes(id) {
  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getUserNotes(id),
    queryKey: ["notes"],
  });

  return { notes, isLoading, error };
}
