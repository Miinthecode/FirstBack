const express = require ('express')
const app = express()      //a biblioteca possui uma função. para simplicar transforma na função app
const port = 6579          // nao pode usar porta que ja esta sendo usada, por padrao porta 3000
const { Pool } = require('pg')  // usada para importar os comandos de conexão

const pool = new Pool({           // Quando o projeto rodar, ele vai criar uma nova conexão 
    user: 'postgres.erzwfacsvpporqmdsasc',
    host: 'aws-0-sa-east-1.pooler.supabase.com', 
    database: 'postgres', 
    password: 'Mi01042025',
    port: 5432
})        

app.use(express.json())           // criar as rotas para inserir produtos
app.post('/produtos', async (req, res) => {                   //async, habilita a funcao await onde vai esperar retornar o requisição para depois seguir
    const {nome, preco, categoria, image_url} = req.body

    if(!nome || !preco || !categoria || !image_url){
        return res.status(400).send('Todos os campos são obrigatórios!')
    }
    if (nome.lenght > 100){                  // lenght faz uma leitura de quantos caracteres tem no lista e diz a quantidade. 
        return res.status(400).send('Nome tem que contar no máximo 100 caracteres.')     // vai ler quantos caracteres tem e apresentar mensagem de erro caso maior que 100
    }
    if (categoria.length > 50){
        return res.status(400).send('Categoria tem que conter no máximo 50 caracteres')
    }

    try {
        const produto = await pool.query(`
        INSERT INTO produtos (nome, preco, categoria, image_url)
        VALUES (
        '${nome}',
        ${preco},
        '${categoria}', 
        '${image_url}'
        )
        RETURNING *        
    `)                                  //inserir e returnar para mim o objeto que acabou de inserir

    res.status(201).send(produto.rows[0])
        
    } catch (error) {
        console.error(error)
        return res.status(500).send('Erro ao cadastrar o produto')
    }      
})

app.get('/produtos', async(req, res) => {                       // rota para visualizar as informações da lista //nao existe req.body no GET
    try {
        const produtos = await pool.query('SELECT * FROM produtos')

        return res.status(200).send(produtos.rows)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Erro ao buscar o produto') 
    }
} ) 

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`)     // crase pois é uma string dinamica
})
                           