const pool = require('./database')

async function getProdutos(){             // criar a model que vai listar todos os produtos
    const produtos = await pool.query('SELECT * FROM produtos')

    return produtos.rows
}
                                           // receber é igual a propries
async function createProduto(produto){            // usuario vai pegar as rotas, vai pegar as informação para a model. E model insere no banco. 
    try {
        const insertProduto = await pool.query(`
            INSERT INTO produtos
            (nome, categoria, preco, image_url)
            VALUES ($1, $2, $3, $4)
            RETURNING * 
            `, [
                produto.nome, 
                produto.categoria, 
                produto.preco, 
                produto.image_url
            ])
    } catch (error) {
        console.error(error)
        throw new Error('Erro ao criar produto!')    // se algo der errado, vai ser criado um erro que vai ser capiturado pelo controller. 
    }
}

module.exports = {
    getProdutos, 
    createProduto
}