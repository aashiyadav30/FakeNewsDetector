import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchNews = async (category?: string) => {
  const params: any = {};
  if (category) params.category = category;
  const response = await axios.get(`${API_BASE_URL}/news`, { params });
  return response.data;
};
