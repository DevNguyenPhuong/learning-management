import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateUser as updateUserAPI } from "../../services/apiUser";
import { setUserData } from "./userSlice";

export function useUpdateUser() {
  const dispatch = useDispatch();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (data) => updateUserAPI(data),
    onSuccess: (result) => {
      dispatch(setUserData(result));
      toast.success("Your information has been updated !!!");
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, can't update now");
    },
  });

  return { updateUser, isPending };
}
