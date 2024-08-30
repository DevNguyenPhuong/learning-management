import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask as deleteTaskApi } from "../../services/apiTask";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useDeleteTask() {
  const { scheduleId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: (taskId) => deleteTaskApi(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`Schedule`, scheduleId],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, can't delete this task");
    },
  });

  return { deleteTask, isPending };
}
