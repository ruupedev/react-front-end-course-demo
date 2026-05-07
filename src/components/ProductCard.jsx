import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductCard({
  data,
  toggleMyyty,
  editTavara,
  poistaTavara,
}) {
  const [open, setOpen] = useState(false);
  const [muokkaus, setMuokkaus] = useState(null);
  /*   const [vanhanimi, setVanhanimi] = useState(""); */

  const avaaMuokkaus = (tavara) => {
    /*   setVanhanimi(tavara.nimi); */
    setMuokkaus({ ...tavara });
    setOpen(true);
  };

  const suljeMuokkaus = () => {
    setOpen(false);
    setMuokkaus(null);
  };

  const tallenna = () => {
    editTavara(muokkaus.id, muokkaus);
    suljeMuokkaus();
  };

  const change = (e) => {
    setMuokkaus({ ...muokkaus, [e.target.name]: e.target.value });
  };

  return (
    <Container sx={{ pt: 4 }}>
      <Grid container spacing={2}>
        {data.map((tavara) => (
          <Grid item xs={12} sm={6} md={4} key={tavara.id}>
            <Card sx={{ position: "relative" }}>
              <IconButton
                size="small"
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={() => avaaMuokkaus(tavara)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ pr: 4 }}>
                  {tavara.nimi}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Valmistaja:</strong> {tavara.valmistaja}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Hinta:</strong> {tavara.hinta}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Myyty:</strong> {tavara.myyty ? "Kyllä" : "Ei"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Kategoria:</strong> {tavara.kategoria}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  sx={{ mt: 1, mr: 1 }}
                  onClick={() => toggleMyyty(tavara.id)}
                >
                  {tavara.myyty ? "Merkitse myyntiin" : "Merkitse myydyksi"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={suljeMuokkaus} fullWidth maxWidth="sm">
        <DialogTitle>Muokkaa tuotetta</DialogTitle>
        {muokkaus && (
          <DialogContent>
            <TextField
              label="Nimi"
              name="nimi"
              value={muokkaus.nimi}
              onChange={change}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Valmistaja"
              name="valmistaja"
              value={muokkaus.valmistaja}
              onChange={change}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Hinta"
              name="hinta"
              value={muokkaus.hinta}
              onChange={change}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Kategoria"
              name="kategoria"
              value={muokkaus.kategoria}
              onChange={change}
              fullWidth
              margin="dense"
            />
          </DialogContent>
        )}
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="contained"
            color="error"
            sx={{ mr: "auto" }}
            onClick={() => {
              poistaTavara(muokkaus.id);
              suljeMuokkaus();
            }}
          >
            Poista
          </Button>
          <Button onClick={suljeMuokkaus}>Peruuta</Button>
          <Button onClick={tallenna} variant="contained">
            Tallenna
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
