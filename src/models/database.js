require('dotenv').config()
const { Pool } = require('pg')             // usada para importar os comandos de conexão

const pool = new Pool({               // Quando o projeto rodar, ele vai criar uma nova conexão 
    user: process.env.DB_USER,
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME, 
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}) 

module.exports = pool                   // transformando arquivo em um módulo exportável