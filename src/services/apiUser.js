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
  const { data, error } = await axios.get(
    `${BASE_URL}/${userId}/schedules`,
    axiosConfig()
  );
  if (error) throw new Error(error.messsage);
  return data;
}