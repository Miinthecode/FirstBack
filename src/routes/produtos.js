const express = require('express')        // metodos para rotas irão ficar todas aqui dentro
const router = express.Router()
const produtosController = require('../controllers/produtos')
const produtosMiddlewares = require('../middlewares/produtos')

router.get('/produtos', produtosController.getProdutos)
router.post('/produtos', produtosMiddlewares.validateCreateProduto, produtosController.createProduto)
router.delete('/produtos/:id', produtosMiddlewares.validateDeleteProduto, produtosController.deleteProduto)

module.exports = router;