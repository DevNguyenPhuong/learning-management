import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (data) => signupAPI(data),

    onSuccess: (data) => {
      toast.success(
        `Congratulations, you account has been successfully created`
      );
      navigate("/login");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Opps, we cannot create your account!");
    },
  });
  return { signup, isPending };
}
