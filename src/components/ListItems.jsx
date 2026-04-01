function ListItems({ data }) {
  //console.log(data)

  const myynnissa = data.filter((tavara) => tavara.myyty === false);
  const myyty = data.filter((tavara) => tavara.myyty === true);

  return (
    <div>
      <h2>Myynnissä</h2>
      {myynnissa.map((tavara) => (
        <p>
          Nimi: {tavara.nimi} <br />
          Valmistaja: {tavara.valmistaja} <br />
          Hinta: {tavara.hinta} <br />
          Myyty: {tavara.myyty.toString()} <br />
          Kategoria: {tavara.kategoria} <br />
        </p>
      ))}

      <h2>Myyty</h2>
      {myyty.map((tavara) => (
        <p>
          Nimi: {tavara.nimi} <br />
          Valmistaja: {tavara.valmistaja} <br />
          Hinta: {tavara.hinta} <br />
          Myyty: {tavara.myyty.toString()} <br />
          Kategoria: {tavara.kategoria} <br />
        </p>
      ))}
    </div>
  );
}
export default ListItems;
