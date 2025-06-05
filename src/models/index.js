// arquivo responsavel por ver todas as novas tabelas criadas e sincronizar com o banco de dados

const sequelize = require ('../config/database')
const Users = require ('./users')
const Produtos = require ('./produtos')

sequelize.sync({alter: true})                      // pode alterar a estrutura da tabela, linhas e colunas
    .then(() => console.log                        // semelhante ao try catch, vai tentar e se der certo ou nao vai exibir uma mensagem
    ('Tabelas sincronizadas com sucesso!'))   
    .catch((error) => console.error('Erro ao sincronizar tabelas!', error))

module.exports = {
    Users,
    Produtos
}