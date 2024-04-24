import mysql from 'mysql2';

// Создайте пул соединений
const db = mysql.createPool({
  host: 'nikit28k.beget.tech',
  user: 'nikit28k_poli',
  password: 'S12s36aa11.',
  database: 'nikit28k_poli'
});

// Экспортируйте пул для использования в других файлах
export default db;

