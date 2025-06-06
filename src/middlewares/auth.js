const jwt = require('jsonwebtoken');
require('dotenv').config();

function validateToken(req, res, next){
    const token = req.headers.authorization // a informação do token é enviado no cabeçalho da requisição
    // campo chamada auto e o valor do campo vai ter o token, e é enviado para todas as rotas. 

    if(!token){
        return res.status(401).send({
            error: 'Token não fornecido'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)   // colocar duas infos o token do usuário e a chave secreta que esta dentro do env. 
        req.user = decoded;       // não é obg, descrip o token, pegando os valores do token e deixando acessível
        next();
    } catch (error) {
        return res.status(401).send({
            error: 'Token inválido!'
        })          // vai dar erro se o token estiver errado ou se ja tiver expirado
    }
} 

module.exports = {
    validateToken
}

