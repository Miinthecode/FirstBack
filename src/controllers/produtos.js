const { Produtos } = require('../models')

async function getProdutos(res, res){
    try {
        const produtos = await Produtos.findAll()

        return res.send(produtos)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Erro ao buscar o produto') 
    }
}

async function createProduto (req, res){
    try {             
        const produto = await Produtos.create(req.body)
        return res.status(201).send(produto)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Erro ao criar o produto!')
    }
}

async function deleteProduto (req, res) {
    const {id} = req.params;
    try {
        await Produtos.destroy({                      // extraio id e mando parametreo para a model
            where: {
                id: id}
    })  
        return res.status(202).send('Produto deletado com sucesso!')
    } catch (error) {
        console.error(error)
        return res.status(500).send('Erro ao deletar o produto!')
    }
}

module.exports = {
    getProdutos, 
    createProduto, 
    deleteProduto
}