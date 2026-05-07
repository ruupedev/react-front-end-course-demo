const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const multer = require("multer");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

// --- Uploads-kansio ---
if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");

// --- Middlewaret ---
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// --- Multer (kuvanlataus) ---
const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

// --- Tietokanta ja taulun luonti ---
const db = new sqlite3.Database("./tavarat.db");

db.run(`
  CREATE TABLE IF NOT EXISTS tavarat (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kategoria TEXT NOT NULL,
    nimi TEXT NOT NULL,
    valmistaja TEXT,
    hinta REAL,
    myyty INTEGER DEFAULT 0,
    kuva TEXT
  )
`);

// =============================
//        CRUD-REITIT
// =============================

// GET — Hae kaikki
app.get("/api/tavarat", (req, res) => {
  db.all("SELECT * FROM tavarat", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    for (const row of rows) {
      const onMyyty = row.myyty === 1;
      row.myyty = onMyyty;
    }

    res.json(rows);
  });
});

// GET — Hae yksi
app.get("/api/tavarat/:id", (req, res) => {
  db.get("SELECT * FROM tavarat WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// POST — Lisää uusi
app.post("/api/tavarat", upload.single("kuva"), (req, res) => {
  const { kategoria, nimi, valmistaja, hinta, myyty } = req.body;
  const kuva = req.file ? req.file.filename : null;

  db.run(
    `INSERT INTO tavarat (kategoria, nimi, valmistaja, hinta, myyty, kuva)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [kategoria, nimi, valmistaja, hinta, myyty === "true" ? 1 : 0, kuva],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    },
  );
});

// PUT — Päivitä
app.put("/api/tavarat/:id", upload.single("kuva"), (req, res) => {
  const { kategoria, nimi, valmistaja, hinta, myyty } = req.body;
  const kuva = req.file ? req.file.filename : null;

  db.run(
    `UPDATE tavarat SET kategoria=?, nimi=?, valmistaja=?, hinta=?, myyty=?, kuva=COALESCE(?, kuva)
     WHERE id=?`,
    [
      kategoria,
      nimi,
      valmistaja,
      hinta,
      myyty === "true" ? 1 : 0,
      kuva,
      req.params.id,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ changes: this.changes });
    },
  );
});

// DELETE — Poista
app.delete("/api/tavarat/:id", (req, res) => {
  db.run("DELETE FROM tavarat WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// --- Käynnistys ---
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä: http://localhost:${PORT}`);
});
