import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { axiosConfig } from "../Utils/axiosConfig";

export async function createTask(task) {
  console.log(task);
  await axios.post(`${BASE_URL}/tasks`, task, axiosConfig());
}

export async function deleteTask(taskId) {
  await axios.delete(`${BASE_URL}/tasks/${taskId}`, axiosConfig());
}

export async function updateTask(newTask) {
  await axios.put(`${BASE_URL}/tasks/${newTask.id}`, newTask, axiosConfig());
}
