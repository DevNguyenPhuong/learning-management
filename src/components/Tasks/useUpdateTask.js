import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask as updateTaskApi } from "../../services/apiTask";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useUpdateTask() {
  const { scheduleId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: updateTask, isPending } = useMutation({
    mutationFn: (data) => updateTaskApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`Schedule`, scheduleId],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, can't update task");
    },
  });

  return { updateTask, isPending };
}
