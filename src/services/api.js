import axios from "axios";

const PALVELIN = "http://localhost:3001";

const tavaraToFormData = (tavara) => {
  const fd = new FormData();
  fd.append("kategoria", tavara.kategoria);
  fd.append("nimi", tavara.nimi);
  fd.append("valmistaja", tavara.valmistaja);
  fd.append("hinta", tavara.hinta);
  fd.append("myyty", tavara.myyty ? "true" : "false");
  if (tavara.kuva instanceof File) {
    fd.append("kuva", tavara.kuva);
  }
  return fd;
};

export const getTavarat = async () => {
  const response = await axios.get(`${PALVELIN}/api/tavarat`);
  return response.data;
};

export const addTavara = async (tavara) => {
  const response = await axios.post(
    `${PALVELIN}/api/tavarat`,
    tavaraToFormData(tavara),
  );
  return response.data;
};

export const editTavara = async (id, tavara) => {
  const response = await axios.put(
    `${PALVELIN}/api/tavarat/${id}`,
    tavaraToFormData(tavara),
  );
  return response.data;
};

export const poistaTavara = async (id) => {
  const response = await axios.delete(`${PALVELIN}/api/tavarat/${id}`);
  return response.data;
};
