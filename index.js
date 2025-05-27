const express = require ('express')
const app = express()      //a biblioteca possui uma função. para simplicar transforma na função app
const port = 6579          // nao pode usar porta que ja esta sendo usada, por padrao porta 3000
const produtosDb = []
const usersDb = []

app.use(express.json())

app.get("/", (req, res) => {    // sempre que essa rota for acessa, vai aparecer uma informação. // arrowfunction, função auto executável
    res.send("Hi Michele!")    // req e res, são obrigatório o uso no backend
})     

app.post("/produtos", (req, res) => {       // O usuário tem que mandar 3 informações. 
    const {nome, preco, categoria} = req.body            //a forma mais fácil de extrair os dados, dentro do req.body vai ter as infos

    if(!nome || !preco || !categoria){
        return res.status(400).send("Nome, preco ou categoria são obrigatórios!")
    }

    const produto = {
        nome: nome,
        preco: preco, 
        categoria: categoria
    }

    produtosDb.push(produto)

    res.status(201).send(produto)
})

app.get("/produtos", (req, res) => {
    res.send(produtosDb)
})

app.post("/usuarios", (req, res) => {
    const {nome, email, senha} = req.body

    if(!nome || !email || !senha){  //se for diferente de nome, ou diferente de email, ou diferente de senha, vai parar a execução
        return res.status(400).send("Email, nome ou senha são obrigatórios!")
    }
    usersDb.push({nome, email, senha})
    res.status(201).send("Usuário cadastrado com sucesso!")
})

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`)     // crase pois é uma string dinamica
})
                           