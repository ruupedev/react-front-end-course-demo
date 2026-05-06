const sqlite3 = require("sqlite3").verbose();

// Objektitaulukko, josta kanta luodaan
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

// 1. Luo/avaa tietokanta
const db = new sqlite3.Database("./tavarat.db", (err) => {
  if (err) {
    return console.error("Virhe:", err.message);
  }
  console.log("Tietokanta avattu.");
});

// 2. Suorita kaikki komennot järjestyksessä
db.serialize(() => {
  db.run("DROP TABLE IF EXISTS tavarat");
  // Luo taulu
  db.run(
    `
    CREATE TABLE tavarat (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kategoria TEXT NOT NULL,
      nimi TEXT NOT NULL,
      valmistaja TEXT,
      hinta REAL,
      myyty INTEGER DEFAULT 0,
      kuva TEXT
    )
  `,
    (err) => {
      if (err) console.error("Taulun luonti epäonnistui:", err.message);
      else console.log("Taulu luotu.");
    },
  );

  // Valmistele INSERT-lause (tehokas tapa lisätä monta riviä)
  const stmt = db.prepare(`
    INSERT INTO tavarat (kategoria, nimi, valmistaja, hinta, myyty)
    VALUES (?, ?, ?, ?, ?)
  `);

  // Käy läpi objektitaulukko ja lisää jokainen rivi
  tavarat.forEach((t) => {
    stmt.run(
      t.kategoria,
      t.nimi,
      t.valmistaja,
      t.hinta,
      t.myyty ? 1 : 0, // boolean -> kokonaisluku
    );
  });

  stmt.finalize(() => {
    console.log("Kaikki tavarat lisätty.");
  });

  // 3. Tarkista että data meni perille
  db.all("SELECT * FROM tavarat", [], (err, rows) => {
    if (err) return console.error(err.message);
    console.log("Kannan sisältö:");
    console.table(rows);
  });
});

// 4. Sulje yhteys
db.close((err) => {
  if (err) return console.error(err.message);
  console.log("Yhteys suljettu.");
});
