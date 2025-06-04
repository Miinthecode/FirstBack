function validateCreateProduto(req, res, next){    // 3 parametros por conta do middlewares
    const { nome, categoria, preco, image_url } = req.body
        if (!nome || !categoria || !preco || !image_url){
            return res.status(400).send("Todos os campos são obrigatórios")
        }
        if(nome.length > 100){
            return res.status(400).send('O nome do produto não pode ter mais do que 100 caracteres.')
        }
        if(categoria.length > 50){
            return res.status(400).send('Categoria não pode ter mais do que 50 caracteres.')
        }

        next();

}
// nao tem o model para buscar pelo id, essa é a forma mais facil
function validateDeleteProduto(req, res, next){
    const {id} = req.params
    if(!id){
        return res.status(400).send('Id do produto é obrigatório')
    }
    next();
}

module.exports = {
    validateCreateProduto, 
    validateDeleteProduto
}