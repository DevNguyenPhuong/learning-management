import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { axiosConfig } from "../Utils/axiosConfig";

export async function getUser(userId) {
  const { data, error } = await axios.get(`${BASE_URL}/users/${userId}`);
  if (error) throw new error(error.message);
  return data;
}

export async function getUserNotes(userId) {
  console.log(userId);
  const { data } = await axios.get(
    `${BASE_URL}/users/${userId}/notes`,
    axiosConfig()
  );
  console.log(data);

  return data;
}

export async function getUserSchedules(userId) {
  // const { data, error } = await axios.get(
  //   `${BASE_URL}/${userId}/schedules`,
  //   axiosConfig()
  // );
  // if (error) throw new Error(error.messsage);
  const fakeData = [
    {
      date: "14-08-2024",
      content: "Thi cấu trúc dữ liệu và giải thuật",
      id: "1",
      priority: "high",
    },
    {
      date: "17-08-2024",
      content: "Thi cấu trúc dữ liệu và giải thuật",
      id: "2",
      priority: "high",
    },
    {
      date: "11-09-2024",
      content: "Thi cấu trúc dữ liệu và giải thuật",
      id: "3",
      priority: "medium",
    },
    {
      date: "21-07-2024",
      content: "Thi cấu trúc dữ liệu và giải thuật",
      id: "4",
      priority: "medium",
    },
    {
      date: "28-08-2024",
      content: "Thi cấu trúc dữ liệu và giải thuật",
      id: "5",
      priority: "medium",
    },
  ];
  return fakeData;
}
