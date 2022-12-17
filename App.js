const express = require("express");
const cors = require("cors");
const Pool = require("pg").Pool;
const fs = require("fs");
const { json } = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// database configuration
const pool = new Pool({
  host: "localhost",
  port: "3006",
  user: "admin",
  password: "adminpassword",
  database: "postgres",
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// get data from informatika table on mahasiswa schema
app.get("/", (req, res) => {
  pool.query("SELECT * FROM mahasiswa.informatika ORDER BY nim ASC", (err, result) => {
    if (err) throw err;
    if (result.length < 0) return false;
    let response = JSON.parse(JSON.stringify(result.rows));
    res.render("index.ejs", {
      data: response,
    });
  });
});

// get form tambah
app.get("/formtambah", (req, res) => {
  res.render("formTambah.ejs");
});

// get form update
app.get("/update/:nim", (req, res) => {
  pool.query(`SELECT * FROM mahasiswa.informatika WHERE nim=${req.params.nim}`,
  (err, result) => {
    let result2 = JSON.parse(JSON.stringify(result.rows));
    res.render("formUpdate.ejs", {data: result2});
  })
});

// add data to informatika table on mahasiswa schema
app.post("/tambah", (req, res) => {
  pool.query("INSERT INTO mahasiswa.informatika (nim, nama, kelas) VALUES ($1, $2, $3)", [
    req.body.nim,
    req.body.nama,
    req.body.kelas,
  ], (err, result) => {
    if (err) {
      throw err;
    }
    res.redirect("/");
  })
});

// delete data
app.get("/delete/:nim", (req, res) => {
  pool.query(`DELETE FROM mahasiswa.informatika WHERE nim='${req.params.nim}'`, (req, rows) => {
    res.redirect("/");
  });
});

// update data
app.post("/update", (req, res) => {
  let oldNim = req.body.nim;
  let newNim = req.body.nim2;
  let newNama = req.body.nama2;
  let newKelas = req.body.kelas2;
  pool.query(`UPDATE mahasiswa.informatika SET nim='${newNim}', nama='${newNama}', kelas='${newKelas}' WHERE nim='${oldNim}'`,
  (err, result) => {
    res.redirect("/");
  })
})