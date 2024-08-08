import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserData } from "../User/userSlice";

export function useLogout() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => {
      return dispatch(clearUserData());
    },
    onSuccess: () => {
      localStorage.clear();
      queryClient.removeQueries();
      navigate("/login");
    },
  });

  return { logout, isPending };
}
