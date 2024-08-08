import axios from "axios";
import { BASE_URL } from "../Utils/constants";

export async function login(userData) {
  const data = await axios.post(`${BASE_URL}/auth/login`, userData);
  console.log(data);
  return data;
}

export async function signup(userData) {
  console.log(userData);
  await axios.post(`${BASE_URL}/auth/signup`, userData);
}
