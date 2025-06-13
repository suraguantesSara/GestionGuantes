const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Sirve los archivos estáticos (html, css, js)

// Conexión a PostgreSQL (Render)
const pool = new Pool({
  user: 'gestionguantes_user',
  host: 'dpg-d1639j24d50c73f0vig0-a.oregon-postgres.render.com',
  database: 'gestionguantes',
  password: 'K2uOPudSR87sYi0E1U3SlUi92kZ4hhEz',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

// Ruta de prueba para ver si funciona
app.get('/api/docenas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM docenas');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al consultar docenas:', err);
    res.status(500).send('Error en la base de datos');
  }
});

// Ruta para insertar una nueva referencia
app.post('/crear-referencia', async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    if (!nombre || !descripcion) {
      return res.status(400).send('Faltan campos requeridos');
    }

    const resultado = await pool.query(
      'INSERT INTO referencias (nombre, descripcion) VALUES ($1, $2)',
      [nombre, descripcion]
    );

    res.send('Referencia creada exitosamente.');
  } catch (err) {
    console.error('❌ ERROR en /crear-referencia:', err);
    res.status(500).send('Error al crear la referencia');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en puerto ${PORT}`);
});
