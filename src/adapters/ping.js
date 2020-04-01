import axios from "axios";
import { SERVER_ROOT_URL } from "../config";

export async function getServerParameters() {
  try {
    const url = SERVER_ROOT_URL + "/parameters";
    const response = await axios.request(url);
    return response.data;
  } catch (error) {
    return { error };
  }
}
