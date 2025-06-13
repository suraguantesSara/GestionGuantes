const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://gestionguantes_user:K2uOPudSR87sYi0E1U3SIUi92kZ4hhef@dpg-d1639j24d50c73f0vig0-a/gestionguantes',
  ssl: { rejectUnauthorized: false } // importante para que Render lo acepte
});

module.exports = pool;
