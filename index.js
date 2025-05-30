const express = require ('express')
const app = express()                     //a biblioteca possui uma função. para simplicar transforma na função app
const port = 6579                       // nao pode usar porta que ja esta sendo usada, por padrao porta 3000
require('dotenv').config()
const { Pool } = require('pg')             // usada para importar os comandos de conexão

const pool = new Pool({               // Quando o projeto rodar, ele vai criar uma nova conexão 
    user: process.env.DB_USER,
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME, 
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
})        

app.use(express.json())           // criar as rotas para inserir produtos
app.post('/produtos', async (req, res) => {     //async, habilita a funcao await onde vai esperar retornar o requisição para depois seguir
    const {nome, preco, categoria, image_url} = req.body

    if(!nome || !preco || !categoria || !image_url){
        return res.status(400).send('Todos os campos são obrigatórios!')
    }
    if (nome.lenght > 100){                  // lenght faz uma leitura de quantos caracteres tem no lista e diz a quantidade. 
        return res.status(400).send('Nome tem que contar no máximo 100 caracteres.')
    }                                        // vai ler quantos caracteres tem e apresentar mensagem de erro caso maior que 100
    if (categoria.length > 50){
        return res.status(400).send('Categoria tem que conter no máximo 50 caracteres')
    }

    try {
        const produto = await pool.query(`
        INSERT INTO produtos (nome, preco, categoria, image_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *        
    `, [nome, preco, categoria, image_url])                         //inserir e returnar para mim o objeto que acabou de inserir

    res.status(201).send(produto.rows[0])
        
    } catch (error) {
        console.error(error)
        return res.status(500).send('Erro ao cadastrar o produto')
    }      
})

app.get('/produtos', async(req, res) => {                  // rota para visualizar as informações da lista //nao existe req.body no GET
    try {
        const produtos = await pool.query('SELECT * FROM produtos')

        return res.status(200).send(produtos.rows)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Erro ao buscar o produto') 
    }
} ) 

app.get('/produtos/:id', async (req, res) => {                       // pegar um produtos espeficio e listas
    const{ id } = req.params                                               // params é uma forma de manda informação atraves da rota get
    try { 
        const produto = await pool.query (`
            SELECT * FROM produtos WHERE id = $1
            `, [id])
        if (!produto.rows.length){           // SE a quantidade de linhas retornadas na minha consulta for zero. aparecerá a mensagem...
            return res.status(404).send('Produto não encontrado')
        }
            return res.status(200).send(produto.rows[0])
    } catch (error) {
        console.error(error)
        return res.status(500).send('Erro ao buscar o produto')
        
    }}
)
        
app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params
         
    try {                                                    // consulta para saber se o produto existe para ser deletado ou não
        const produto = await pool.query(`                  
            SELECT * FROM produtos WHERE id = $1
            `, [id])
        if(!produto.rows.length){
            return res.status(404).send('Produto não encontrado!')
        }

        await pool.query (`
            DELETE FROM produtos WHERE id = $1
            `, [id])
            return res.status(202).send('Produto deletado com sucesso!')
    } catch (error) {
        console.error(error)
        return res.status().send('Erro ao deletar o produto')
    }
})

app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params
    const { nome, preco, categoria, image_url } = req.body;

    try {
        const produto = await pool.query(`
            SELECT * FROM produtos WHERE id = $1
            `, [id])

        if(!produto.rows.length){
            return res.send('Produto atualizado com sucesso!')   // se houver o produto, vai ser realizado o update
        }

        await pool.query(`
            UPDATE produtos SET
            nome = $1, 
            preco = $2, 
            categoria = $3,
            image_url = $4
            WHERE id = $5
            `, [nome, preco, categoria, image_url, id])
    } catch (error) {
            console.error(error)
            return res.status(500).send('Produto não encontrado!')
    }
})

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`)     // crase pois é uma string dinamica
})
                           