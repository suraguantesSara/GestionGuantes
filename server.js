const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Conexión a PostgreSQL
const pool = new Pool({
  user: 'gestionguantes_user',
  host: 'dpg-d1639j24d50c73f0vig0-a.oregon-postgres.render.com',
  database: 'gestionguantes',
  password: 'K2uOPudSR87sYi0E1U3SIUi92kZ4hhef',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

// Ruta de prueba
app.get('/api/docenas', async (req, res) => {
  const { taller, referencia, proceso } = req.query;
  let query = 'SELECT * FROM docenas';
  const params = [];

  if (taller) {
    query += ' WHERE taller_actual_id IN (SELECT id FROM talleres WHERE nombre = $1)';
    params.push(taller);
  } else if (referencia) {
    query += ' WHERE referencia_id IN (SELECT id FROM referencias WHERE nombre = $1)';
    params.push(referencia);
  } else if (proceso) {
    query += ' WHERE estado_actual 

const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // asegúrate de tener admin.html ahí

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "tu_url_de_postgres"
});

// ================== RUTAS API ADMIN ==================

app.post("/crear-taller", async (req, res) => {
  try {
    const { nombre, area } = req.body;
    await pool.query("INSERT INTO talleres (nombre, area) VALUES ($1, $2)", [nombre, area]);
    res.send("Taller creado exitosamente.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear taller");
  }
});

app.post("/crear-referencia", async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    await pool.query("INSERT INTO referencias (nombre, descripcion) VALUES ($1, $2)", [nombre, descripcion]);
    res.send("Referencia creada exitosamente.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear referencia");
  }
});

app.post("/crear-docena", async (req, res) => {
  try {
    const { referencia_id, taller_actual_id } = req.body;
    await pool.query(
      "INSERT INTO docenas (referencia_id, taller_actual_id) VALUES ($1, $2)",
      [referencia_id, taller_actual_id]
    );
    res.send("Docena creada exitosamente.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear docena");
  }
});

app.post("/registrar-movimiento", async (req, res) => {
  try {
    const { docena_id, proceso_origen, observaciones } = req.body;
    await pool.query(
      "INSERT INTO movimientos (docena_id, proceso_origen, observaciones, fecha) VALUES ($1, $2, $3, NOW())",
      [docena_id, proceso_origen, observaciones]
    );
    res.send("Movimiento registrado exitosamente.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al registrar movimiento");
  }
});

// ================== ENDPOINTS PARA SELECT ==================

app.get("/api/referencias", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, nombre FROM referencias");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error cargando referencias");
  }
});

app.get("/api/docenas", async (req, res) => {
  try {
    const result = await pool.query("SELECT id FROM docenas ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error cargando docenas");
  }
});

// ================== ARRANQUE SERVIDOR ==================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


