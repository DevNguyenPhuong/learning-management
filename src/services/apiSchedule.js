import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { axiosConfig } from "../Utils/axiosConfig";

export async function createSchedule(schedule) {
  await axios.post(`${BASE_URL}/schedules`, schedule, axiosConfig());
}

export async function getScheduleTasks(scheduleId) {
  const { data, error } = await axios.get(
    `${BASE_URL}/schedules/${scheduleId}/tasks`,
    axiosConfig()
  );
  if (error) throw error;

  const sortedTasks = data.data.sort((a, b) => {
    return a.id.localeCompare(b.id);
  });

  return sortedTasks;
}
