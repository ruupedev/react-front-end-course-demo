import axios from "axios";

const PALVELIN = "http://localhost:3001";

// Muuntaa frontin boolean-arvot backendin odottamaan muotoon
const valmisteleData = (tavara) => ({
  ...tavara,
  myyty: tavara.myyty ? "true" : "false",
});

export const getTavarat = async () => {
  const response = await axios.get(`${PALVELIN}/api/tavarat`);
  return response.data;
};

export const addTavara = async (tavara) => {
  const response = await axios.post(
    `${PALVELIN}/api/tavarat`,
    valmisteleData(tavara),
  );
  return response.data;
};

export const editTavara = async (id, tavara) => {
  const response = await axios.put(
    `${PALVELIN}/api/tavarat/${id}`,
    valmisteleData(tavara),
  );
  return response.data;
};

export const poistaTavara = async (id) => {
  const response = await axios.delete(`${PALVELIN}/api/tavarat/${id}`);
  return response.data;
};
