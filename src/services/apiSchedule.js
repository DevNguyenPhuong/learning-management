import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { axiosConfig } from "../Utils/axiosConfig";

export async function createEvent(userId, event) {
  console.log({ userId, event });
  // await axios.post(
  //   `${BASE_URL}/users/${userId}/schedules`,
  //   event,
  //   axiosConfig()
  // );
}

export async function getScheduleTasks(scheduleId) {
  // await axios.get(`${BASE_URL}/schedules/${scheduleId}/taks`);
  const data = [
    {
      id: "1",
      content: "This is the task 1",
      isChecked: true,
    },
    {
      id: "2",
      content: "This is the task 2",
      isChecked: false,
    },
    {
      id: "3",
      content: "This is the task 3",
      isChecked: true,
    },
    {
      id: "4",
      content: "This is the task 4",
      isChecked: false,
    },
  ];

  return data;
}
