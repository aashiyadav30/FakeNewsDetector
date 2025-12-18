import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getHistory = async () => {
  const response = await axios.get(`${API_BASE_URL}/history`);
  return response.data;
};
