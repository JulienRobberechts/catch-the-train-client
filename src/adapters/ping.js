import axios from "axios";

export async function getServerParameters(serverUrl) {
  try {
    const url = serverUrl + "/parameters";
    const response = await axios.request(url);
    return response.data;
  } catch (error) {
    return { error };
  }
}
