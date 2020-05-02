import axios from "axios";

export interface RequestResult {
  loading?: boolean;
  error?: string;
}

export interface PingResult extends RequestResult {
  status?: string;
  serverPublicIp?: string;
  version?: string;
}

export async function getServerParameters(
  serverUrl: string
): Promise<PingResult> {
  try {
    const url = serverUrl + "/parameters";
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return { error };
  }
}
