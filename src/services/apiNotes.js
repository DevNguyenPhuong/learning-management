import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { axiosConfig } from "../Utils/axiosConfig";

export async function createUpdateNote({ note, type, updateNoteId }) {
  if (type === "create")
    await axios.post(`${BASE_URL}/notes`, note, axiosConfig());
  if (type === "update")
    await axios.put(`${BASE_URL}/notes/${updateNoteId}`, note, axiosConfig());
}

export async function getNote(noteId) {
  const { data, error } = axios.get(`${BASE_URL}/${noteId}`);
  if (error) throw new Error(error.messsage);
  return data;
}

export async function updateNote(noteId, newNote) {
  await axios.post(`${BASE_URL}/${noteId}`, newNote, axiosConfig());
}

export async function deleteNote(noteId) {
  await axios.delete(`${BASE_URL}/notes/${noteId}`, axiosConfig());
}
