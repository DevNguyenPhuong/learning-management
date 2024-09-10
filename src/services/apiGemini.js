import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { axiosConfig } from "../Utils/axiosConfig";

export async function createGeminiResponse(prompt) {
  const { data, error } = await axios.post(
    `${BASE_URL}/gemini`,
    prompt,
    axiosConfig()
  );
  if (error) throw error;

  // Parse the JSON string into an object
  const responseObject = JSON.parse(data?.data);

  // Navigate to the text part
  const text = responseObject.candidates[0].content.parts[0].text;

  // Output the text

  // Convert the JSON string to a JavaScript array of objects
  const tasksArray = JSON.parse(text);

  return tasksArray;
}
