const jwt = require ('jsonwebtoken');
const {Users} = require ('../models');
require ('dotenv').config();
const bcrypt = require('bcrypt')        // importações necessarios para login

async function login(req, res){
    const {email, password} = req.body;  // pegar do corpo as informações de login
    
    try {
        const user = await Users.findOne({
            where: {
            email: email              // se não apresentar nada é pq o cadastro não existe ou o email informado esta errado
        }
        })  // buscar o usuário e saber se ele existe no banco de dados
        

    if(!user){                 // caso usuário não existe é retornado essa mensagem de erro
        return res.status(401).send({
            error: 'Usuário não encontrado'
        })
    }

    // próximo passo é comparar a senha
    // dentro do (), vai ser validada as senhas 0 a informada e a do banco de dados. 
    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        res.status(401).send({
            error: 'Senha incorreta!'
        })
    }

    //criar o tokem e criptografar a senha
    const token = jwt.sign(                // quais serão os dados armazenados no token? rotas para adm e para vendedores, qual o cargo
        {id: user.id, email: user.email},
        process.env.JWT_SECRET,                        // chave secreta para processar esse tokem
        {expiresIn: process.env.JWT_EXPIRES_IN}       // informação de expiração
    )

    return res.send({
        token
    })

    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

module.exports = {
    login
}