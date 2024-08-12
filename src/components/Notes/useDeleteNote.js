import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote as deleteNoteAPI } from "../../services/apiNotes";
import { toast } from "react-hot-toast";

export function useDeleteNote() {
  const queryClient = useQueryClient();
  const { mutate: deleteNote, isPending } = useMutation({
    mutationFn: (noteId) => deleteNoteAPI(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, can't delete this note");
    },
  });

  return { deleteNote, isPending };
}
