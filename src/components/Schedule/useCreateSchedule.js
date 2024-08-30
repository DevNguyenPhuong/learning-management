import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSchedule as createScheduleAPI } from "../../services/apiSchedule";
export function useCreateSchedule() {
  const { mutate: createSchedule, isPending } = useMutation({
    mutationFn: (schedule) => createScheduleAPI(schedule),
    onError: () => {
      toast.error("Cannot add Schedule");
    },
  });

  return { createSchedule, isPending };
}
