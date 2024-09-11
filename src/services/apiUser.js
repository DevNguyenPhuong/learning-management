import axios from "axios";
import { axiosConfig } from "../Utils/axiosConfig";
import { BASE_URL } from "../Utils/constants";
import { getDaysInCurrentWeek } from "../Utils/helpers";

export async function getUser(userId) {
  const { data, error } = await axios.get(`${BASE_URL}/users/${userId}`);
  if (error) throw new error(error.message);
  return data;
}

export async function getUserNotes(userId) {
  const { data, error } = await axios.get(
    `${BASE_URL}/users/${userId}/notes`,
    axiosConfig()
  );
  if (error) throw error;

  const sortedNotes = data?.data.sort((a, b) => {
    return a.id.localeCompare(b.id);
  });

  return sortedNotes;
}

export async function getUserSchedules(userId) {
  const { data, error } = await axios.get(
    `${BASE_URL}/users/${userId}/schedules`,
    axiosConfig()
  );
  if (error) throw new Error(error.messsage);

  return data?.data;
}

export async function updateUser(newUser) {
  const { data, error } = await axios.put(
    `${BASE_URL}/users/${newUser.id}`,
    newUser,
    axiosConfig()
  );

  if (error) throw error;

  return data?.data;
}

export async function getUserInfo(userId) {
  const { data, error } = await axios.get(`${BASE_URL}/users/${userId}`);
  if (error) throw error;

  return data?.data;
}

export async function getUpComingEvent(userId) {
  const { data, error } = await axios.get(
    `${BASE_URL}/users/${userId}/upComingEvent`,
    axiosConfig()
  );
  if (error) throw error;
  return data?.data;
}

export async function getWeekSchedules(userId, week) {
  const arrDay = getDaysInCurrentWeek(week);

  const schedulePromises = arrDay.map((day) =>
    axios.get(`${BASE_URL}/users/${userId}/schedules/${day}`, axiosConfig())
  );

  try {
    const responses = await Promise.all(schedulePromises);

    const schedules = responses.map((response) => response.data?.data);

    return schedules;
  } catch (error) {
    throw error;
  }
}
