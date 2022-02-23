
class Erro {
    constructor(){}

    erro(erro, req, res, next){
        console.log(erro)
        if(erro.name === 400){
          return res.json({sucess : false, erro : erro.message, status : 400})
        }
    }
}

module.exports = new Erro().erro