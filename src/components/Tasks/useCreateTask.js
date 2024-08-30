import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask as createTaskApi } from "../../services/apiTask";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useCreateTask() {
  const { scheduleId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: createTask, isPending } = useMutation({
    mutationFn: (data) => createTaskApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`Schedule`, scheduleId],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, can't create task");
    },
  });

  return { createTask, isPending };
}
