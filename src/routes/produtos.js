const express = require('express')        // metodos para rotas irão ficar todas aqui dentro
const router = express.Router()
const produtosController = require('../controllers/produtos')

router.get('/produtos', produtosController.getProdutos)
router.post('/produtos', produtosController.createProduto)

module.exports = router;