import axios from "axios";

let server = "http://localhost:3001";

export const getTavarat = async () => {
  const response = await axios.get(`${server}/api/tavarat`);
  return response.data;
};

export const addTavara = async (tavara) => {
  const response = await axios.post(`${server}/api/tavarat`, tavara);
  return response.data;
};

export const toggleMyyty = async (id, myyty) => {
  const response = await axios.put(`${server}/api/tavarat/${id}`, { myyty });
  return response.data;
};

export const editTavara = async (id, tavara) => {
  const response = await axios.put(`${server}/api/tavarat/${id}`, tavara);
  return response.data;
};

export const poistaTavara = async (id) => {
  const response = await axios.delete(`${server}/api/tavarat/${id}`);
  return response.data;
};
