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
    query += ' WHERE estado_actual = $1';
    params.push(proceso);
  }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la base de datos');
  }
});

// Crear referencia
app.post('/crear-referencia', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    await pool.query('INSERT INTO referencias (nombre, descripcion) VALUES ($1, $2)', [nombre, descripcion]);
    res.send('Referencia creada exitosamente.');
  } catch (err) {
    console.error("❌ ERROR en /crear-referencia:", err);
    res.status(500).send('Error al crear la referencia');
  }
});

// Crear taller
app.post('/crear-taller', async (req, res) => {
  const { nombre, area } = req.body;
  try {
    await pool.query('INSERT INTO talleres (nombre, area) VALUES ($1, $2)', [nombre, area]);
    res.send('Taller creado exitosamente.');
  } catch (err) {
    console.error("❌ ERROR en /crear-taller:", err);
    res.status(500).send('Error al crear el taller');
  }
});

// Crear docenas
app.post('/crear-docena', async (req, res) => {
  const { referencia_id, taller_actual_id } = req.body;
  try {
    await pool.query('INSERT INTO docenas (referencia_id, taller_actual_id) VALUES ($1, $2)', [referencia_id, taller_actual_id]);
    res.send('Docena registrada exitosamente.');
  } catch (err) {
    console.error("❌ ERROR en /crear-docena:", err);
    res.status(500).send('Error al registrar la docena');
  }
});

// Registrar movimiento
app.post('/registrar-movimiento', async (req, res) => {
  const { docena_id, proceso_origen, observaciones } = req.body;

  const procesoSecuencia = {
    troquelado: 'armado',
    armado: 'cerrado',
    cerrado: 'volteado',
    volteado: 'stock final'
  };

  const proceso_destino = procesoSecuencia[proceso_origen];
  try {
    const docena = await pool.query('SELECT * FROM docenas WHERE id = $1', [docena_id]);
    const taller_origen_id = docena.rows[0].taller_actual_id;

    const talleresDestino = await pool.query(
      'SELECT id FROM talleres WHERE area = $1 LIMIT 1',
      [proceso_destino]
    );

    const taller_destino_id = talleresDestino.rows[0].id;

    await pool.query(
      'INSERT INTO movimientos (docena_id, proceso_origen, proceso_destino, taller_origen_id, taller_destino_id, observaciones) VALUES ($1, $2, $3, $4, $5, $6)',
      [docena_id, proceso_origen, proceso_destino, taller_origen_id, taller_destino_id, observaciones || null]
    );

    await pool.query(
      'UPDATE docenas SET estado_actual = $1, taller_actual_id = $2 WHERE id = $3',
      [proceso_destino, taller_destino_id, docena_id]
    );

    res.send('Movimiento registrado exitosamente.');
  } catch (err) {
    console.error("❌ ERROR en /registrar-movimiento:", err);
    res.status(500).send('Error al registrar el movimiento');
  }
});

// Obtener talleres
app.get('/api/talleres', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM talleres');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener talleres');
  }
});

// Obtener referencias
app.get('/api/referencias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM referencias');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener referencias');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en puerto ${PORT}`);
});

