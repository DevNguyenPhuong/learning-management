import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/apiUser";
export function useGetNotes(userId) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getUserInfo(userId),
    queryKey: ["userInfo"],
  });

  return { user, isLoading, error };
}
