// arquivo de configuraçãoes e rotas

const express = require('express')
const app = express()
const port = 6579 
require ('./src/models')          // para sincronizar o banco de dados que foi criado no model index
const produtosRoutes = require('./src/routes/produtos')        // importar as rotas
const usersRoutes = require('./src/routes/users')
const authRoutes = require('./src/routes/auth')

app.use(express.json())
app.use(produtosRoutes)
app.use(usersRoutes)
app.use(authRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})