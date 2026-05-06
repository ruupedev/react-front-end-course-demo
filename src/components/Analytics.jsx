import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#424242", "#757575", "#9e9e9e", "#bdbdbd"];

export default function Analytics({ data }) {
  const myynnissaItems = data.filter((t) => !t.myyty);
  const myytyItems = data.filter((t) => t.myyty);
  const myynnissaArvo = myynnissaItems.reduce(
    (sum, t) => sum + Number(t.hinta),
    0,
  );
  const myytyArvo = myytyItems.reduce((sum, t) => sum + Number(t.hinta), 0);

  const pieData = [
    { name: "Myynnissä", value: myynnissaItems.length },
    { name: "Myyty", value: myytyItems.length },
  ];

  // Category bar chart data
  const kategoriat = {};
  data.forEach((t) => {
    if (!kategoriat[t.kategoria]) {
      kategoriat[t.kategoria] = { kategoria: t.kategoria, arvo: 0, maara: 0 };
    }
    kategoriat[t.kategoria].arvo += Number(t.hinta);
    kategoriat[t.kategoria].maara += 1;
  });
  const barData = Object.values(kategoriat);

  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Analytiikka
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Tuotteita
              </Typography>
              <Typography variant="h4">{data.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Myyty
              </Typography>
              <Typography variant="h4">{myytyItems.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Inventaario
              </Typography>
              <Typography variant="h4">{myynnissaArvo} €</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Kokonaismyynti
              </Typography>
              <Typography variant="h4">{myytyArvo} €</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Myyntitilanne
              </Typography>
              <ResponsiveContainer width={400} height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Arvo kategorioittain
              </Typography>
              <ResponsiveContainer width={250} height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="kategoria" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="arvo" name="Arvo (€)" fill="#424242" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
