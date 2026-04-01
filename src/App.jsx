import { useState } from "react";
import ListItems from "./components/ListItems";
import SearchList from "./components/SearchList";
import AddItem from "./components/AddItem";

function App() {
  const tavarat = [
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
  ];

  return (
    <>
      <ListItems data={tavarat} />
      <SearchList data={tavarat} />
      <AddItem />
    </>
  );
}

export default App;
