import axios from "axios";
import { BASE_URL } from "../Utils/constants";

export async function login(userData) {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, userData);
  return data?.data;
}

export async function signup(userData) {
  const { data } = await axios.post(`${BASE_URL}/auth/signup`, userData);
  return data;
}
