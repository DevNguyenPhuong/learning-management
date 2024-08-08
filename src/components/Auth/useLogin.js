import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "../User/userSlice";

export function useLogin() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (data) => loginAPI(data),

    onSuccess: (result) => {
      queryClient.setQueryData(["user"], result?.data);
      dispatch(setUserData({ ...result.data, isAuthenticated: true }));
      localStorage.setItem("jwtToken", result?.data?.jwtToken);
      localStorage.setItem("isAuthenticated", true);
      navigate("/dashboard");
      toast.success(`Welcome ${result?.data?.username}`);
    },

    onError: () => {
      toast.error("Invalid username or password!");
    },
  });

  return { login, isPending };
}
