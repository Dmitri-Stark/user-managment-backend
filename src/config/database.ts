import mysql from 'mysql2/promise';

export const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  port: 3306,
  user: 'user',
  password: 'password',
  database: 'mydatabase',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

export const pool = mysql.createPool(dbConfig);