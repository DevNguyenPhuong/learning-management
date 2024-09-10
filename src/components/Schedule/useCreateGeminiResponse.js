import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGeminiResponse as createGeminiResponseAPI } from "../../services/apiGemini";
export function useCreateGeminiResponse() {
  const {
    mutate: createGeminiResponse,
    isPending,
    data,
    error,
  } = useMutation({
    mutationFn: (prompt) => createGeminiResponseAPI(prompt),
    onError: (e) => {
      console.log(e);
      toast.error("Cannot create response");
    },
  });

  return { createGeminiResponse, isPending, data, error };
}
