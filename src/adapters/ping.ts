import axios from "axios";

export async function getServerParameters(serverUrl: string) {
  try {
    const url = serverUrl + "/parameters";
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return { error };
  }
}
