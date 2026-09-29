/*
  ASENNETTAVAT KIRJASTOT JA FONTIT (jos eivät ole jo asennettuna):

  npm install @mui/material @emotion/react @emotion/styled
  npm install @mui/icons-material
  npm install @fontsource/roboto
  npm install react-router
  npm install recharts
*/

import { useState, useEffect } from "react";
import ListItems from "./components/ListItems";
import SearchList from "./components/SearchList";
import AddItem from "./components/AddItem";
import Notification from "./components/Notification";
/* import TabComp from "./components/TabComp"; */
import "@fontsource/roboto";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MenuMUI from "./components/Menu";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductCard from "./components/ProductCard";
import Analytics from "./components/Analytics";
import {
  getTavarat,
  addTavara as apiAddTavara,
  editTavara as apiEditTavara,
  poistaTavara as apiPoistaTavara,
} from "./services/api";

function App() {
  /*  const [tavarat, setTavarat] = useState([
    {
      kategoria: "kirjat",
      nimi: "Luvattu Maa",
      valmistaja: "Otava",
      hinta: 3,
      myyty: false,
    },
    {
      kategoria: "korut",
      nimi: "Hopeinen sormus",
      valmistaja: "Tuntematon",
      hinta: 55,
      myyty: false,
    },
    {
      kategoria: "astiat",
      nimi: "Juomalasi",
      valmistaja: "Iittala",
      hinta: 4,
      myyty: true,
    },
  ]); */

  useEffect(() => {
    fetchData();
  }, []);

  const [tavarat, setTavarat] = useState([]);
  const [notification, setNotification] = useState({
    text: "",
    type: "success",
  });

  const showNotification = (text, type = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification({ text: "", type }), 3000);
  };

  const fetchData = async () => {
    try {
      const data = await getTavarat();
      setTavarat(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // LISÄYS
  const addTavara = async (uusiTavara) => {
    try {
      await apiAddTavara(uusiTavara);
      fetchData();
      showNotification(`${uusiTavara.nimi} lisätty!`, "success");
    } catch (error) {
      console.error("Lisäys epäonnistui:", error);
      showNotification("Lisäys epäonnistui", "error");
    }
  };

  // MYYTY-TILAN VAIHTO
  const toggleMyyty = async (id) => {
    try {
      const tavara = tavarat.find((t) => t.id === id);
      const uusiTila = !tavara.myyty;
      await apiEditTavara(id, { ...tavara, myyty: uusiTila });
      fetchData();
      showNotification(
        uusiTila
          ? `${tavara.nimi} merkattu myydyksi 🎉`
          : `${tavara.nimi} palautettu myyntiin`,
        uusiTila ? "success" : "info",
      );
    } catch (error) {
      console.error("Muokkaus epäonnistui:", error);
      showNotification("Muokkaus epäonnistui", "error");
    }
  };

  // POISTO
  const poistaTavara = async (id) => {
    try {
      const tavara = tavarat.find((t) => t.id === id);
      await apiPoistaTavara(id);
      fetchData();
      showNotification(`${tavara.nimi} poistettu`, "info");
    } catch (error) {
      console.error("Poisto epäonnistui:", error);
      showNotification("Poisto epäonnistui", "error");
    }
  };

  // MUOKKAUS
  const editTavara = async (id, muokattu) => {
    try {
      await apiEditTavara(id, muokattu);
      fetchData();
      showNotification(`${muokattu.nimi} päivitetty`, "success");
    } catch (error) {
      console.error("Muokkaus epäonnistui:", error);
      showNotification("Muokkaus epäonnistui", "error");
    }
  };
  const theme = createTheme({
    palette: {
      primary: { main: grey[900], contrastText: "#FFFFFF" },
      secondary: { main: grey[700], contrastText: "#FFFFFF" },
      text: { primary: grey[900], secondary: grey[600] },
    },

    typography: {
      fontFamily: '"roboto", sans-serif',
    },

    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: "white",
            height: "4px",
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            "&.Mui-selected": {
              backgroundColor: grey[800],
              color: grey[100],
            },
          }, // root
        },
      }, // MuiTab

      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: grey[900],
            color: "#FFFFFF",
          },
        },
      }, // MuiMenu

      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: "#FFFFFF",
          },
        },
      }, // MuiListItemIcon

      MuiMenuItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: grey[200],
              color: grey[900],
              "& .MuiListItemIcon-root": {
                color: grey[900],
              },
            },
          }, // root
        },
      }, //MuiMenuItem
    }, // components
  }); // theme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Notification text={notification.text} type={notification.type} />
      <BrowserRouter>
        <Routes>
          <Route element={<MenuMUI />}>
            <Route
              path="/"
              element={
                <ListItems
                  data={tavarat}
                  toggleMyyty={toggleMyyty}
                  editTavara={editTavara}
                  poistaTavara={poistaTavara}
                />
              }
            />
            <Route
              path="/hae"
              element={
                <SearchList
                  data={tavarat}
                  toggleMyyty={toggleMyyty}
                  editTavara={editTavara}
                  poistaTavara={poistaTavara}
                />
              }
            />
            <Route path="/lisaa" element={<AddItem addTavara={addTavara} />} />
            <Route path="/analytiikka" element={<Analytics data={tavarat} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
