import { useState } from "react";
import { TextField, Button, Box, Container } from "@mui/material";

function AddItem({ addTavara }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!item.nimi.trim()) newErrors.nimi = "Nimi on pakollinen";
    if (!item.valmistaja.trim())
      newErrors.valmistaja = "Valmistaja on pakollinen";
    if (!item.kategoria.trim()) newErrors.kategoria = "Kategoria on pakollinen";
    if (Number(item.hinta) <= 0)
      newErrors.hinta = "Hinnan pitää olla suurempi kuin 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [item, setItem] = useState({
    kategoria: "",
    nimi: "",
    valmistaja: "",
    hinta: 0,
    myyty: false,
  });

  const change = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const AddItemToList = () => {
    if (!validate()) return;
    addTavara(item);
    setItem({
      kategoria: "",
      nimi: "",
      valmistaja: "",
      hinta: 0,
      myyty: false,
    });
    setErrors({});
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
      >
        <TextField
          label="Nimi"
          name="nimi"
          value={item.nimi}
          onChange={change}
          error={Boolean(errors.nimi)}
          helperText={errors.nimi}
          fullWidth
        />
        <TextField
          label="Valmistaja"
          name="valmistaja"
          value={item.valmistaja}
          onChange={change}
          error={Boolean(errors.valmistaja)}
          helperText={errors.valmistaja}
          fullWidth
        />
        <TextField
          label="Hinta"
          name="hinta"
          type="number"
          value={item.hinta}
          onChange={change}
          error={Boolean(errors.hinta)}
          helperText={errors.hinta}
          fullWidth
        />
        <TextField
          label="Kategoria"
          name="kategoria"
          value={item.kategoria}
          onChange={change}
          error={Boolean(errors.kategoria)}
          helperText={errors.kategoria}
          fullWidth
        />
        <Button variant="contained" onClick={AddItemToList}>
          Lisää
        </Button>
      </Box>
    </Container>
  );
}
export default AddItem;
