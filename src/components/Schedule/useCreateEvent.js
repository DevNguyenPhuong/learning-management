import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEvent as createEventAPI } from "../../services/apiSchedule";
export function useCreateEvent() {
  const { mutate: createEvent, isPending } = useMutation({
    mutationFn: ({ userId, event }) => createEventAPI(userId, event),
    onError: () => {
      toast.error("Cannot add event");
    },
  });

  return { createEvent, isPending };
}
