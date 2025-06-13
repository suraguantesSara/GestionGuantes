const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Ruta para crear una referencia
app.post('/crear-referencia', async (req, res) => {
  const { nombre, descripcion } = req.body;
  await db.query('INSERT INTO referencias (nombre, descripcion) VALUES ($1, $2)', [nombre, descripcion]);
  res.send('Referencia creada exitosamente.');
});

// Ruta para crear un taller
app.post('/crear-taller', async (req, res) => {
  const { nombre, area } = req.body;
  await db.query('INSERT INTO talleres (nombre, area) VALUES ($1, $2)', [nombre, area]);
  res.send('Taller creado exitosamente.');
});

// Ruta para registrar una docena
app.post('/crear-docena', async (req, res) => {
  const { referencia_id, taller_id } = req.body;
  await db.query('INSERT INTO docenas (referencia_id, taller_actual_id) VALUES ($1, $2)', [referencia_id, taller_id]);
  res.send('Docena registrada exitosamente.');
});

// Ruta para mover una docena
app.post('/registrar-movimiento', async (req, res) => {
  const { docena_id, origen, destino, taller_origen, taller_destino, observaciones } = req.body;
  await db.query(`
    INSERT INTO movimientos (docena_id, proceso_origen, proceso_destino, taller_origen_id, taller_destino_id, observaciones)
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [docena_id, origen, destino, taller_origen, taller_destino, observaciones]);

  await db.query(`
    UPDATE docenas SET estado_actual = $1, taller_actual_id = $2 WHERE id = $3
  `, [destino, taller_destino, docena_id]);

  res.send('Movimiento registrado.');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
