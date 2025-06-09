const express = require('express')        // metodos para rotas irão ficar todas aqui dentro
const router = express.Router()
const produtosController = require('../controllers/produtos')
const produtosMiddlewares = require('../middlewares/produtos')
const authMiddleware = require('../middlewares/auth')

router.get('/produtos', authMiddleware.validateToken, authMiddleware.validateToken, produtosController.getProdutos)

router.post('/produtos', authMiddleware.validateToken, produtosMiddlewares.validateCreateProduto, produtosController.createProduto)

router.delete('/produtos/:id', authMiddleware.validateToken, produtosMiddlewares.validateDeleteProduto, produtosController.deleteProduto)


module.exports = router;