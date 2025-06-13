const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Sirve los archivos HTML, CSS y JS

// Conexión a PostgreSQL (datos de tu Render)
const pool = new Pool({
  user: 'gestionguantes_user',
  host: 'dpg-d1639j24d50c73f0vig0-a.oregon-postgres.render.com',
  database: 'gestionguantes',
  password: 'K2uOPudSR87sYi0E1U3SlUi92kZ4hhEz',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

// Ruta de prueba: obtener docenas
app.get('/api/docenas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM docenas');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la base de datos');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
