function ShowSearch({ data }) {
  return data.map((tavara) => (
    <p>
      Nimi: {tavara.nimi} <br />
      Valmistaja: {tavara.valmistaja} <br />
      Hinta: {tavara.hinta} <br />
      Myyty: {tavara.myyty.toString()} <br />
      Kategoria: {tavara.kategoria} <br />
    </p>
  ));
}

export default ShowSearch;
