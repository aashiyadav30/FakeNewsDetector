import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const detectNews = async (content: string) => {
  const response = await axios.post(`${API_BASE_URL}/detect`, {
    content,
  });

  return response.data;
};
