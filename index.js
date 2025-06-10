// arquivo de configuraçãoes e rotas

require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 6579;  // mesmo que .env não tenha uma porta, a porta vai ser 6579  
require ('./src/models')          // para sincronizar o banco de dados que foi criado no model index
const produtosRoutes = require('./src/routes/produtos')        // importar as rotas
const usersRoutes = require('./src/routes/users')
const authRoutes = require('./src/routes/auth')
const cors = require('cors')

app.use(cors())   //se não tiver, o site não consegue se comunicar com api
app.use(express.json())
app.use(produtosRoutes)
app.use(usersRoutes)
app.use(authRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})