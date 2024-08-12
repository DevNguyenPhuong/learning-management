import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signup as signupAPI } from "../../services/apiAuth";

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
    onError: (error) => {
      const { response } = error;
      toast.error(
        response?.data.message || "Opps, we cannot create your account!"
      );
    },
  });
  return { signup, isPending };
}
