import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateNote as createUpdateNoteAPI } from "../../services/apiNotes";
import { toast } from "react-hot-toast";

export function useCreateUpdateNote() {
  const queryClient = useQueryClient();
  const { mutate: createUpdateNote, isPending } = useMutation({
    mutationFn: (data) => createUpdateNoteAPI(data),

    onSuccess: (data, payload) => {
      toast.success(`Note ${payload.type}d`);
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, can't create note");
    },
  });

  return { createUpdateNote, isPending };
}
