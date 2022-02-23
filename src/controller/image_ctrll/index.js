const Model = require('../../models/image')
const is = require('../isVerify')
class Controller {
    constructor(){}

    async Create(req, res, next){
        let {id} = req.params
        let imagems =  await req.imagems // essas imagems foram setadas 
        if( await is.isExistInImage(id)){
            return res.status(203).json({sucess : false, erro : 'ja exite dados cadastrado com esse id'}) // não authorizado
        }
        try {
            let Resultado = await Model.Create( await imagems, id)
            if(Resultado.status == 500){
                return next(Resultado.erro)
            }
            return res.status(200).json({id : Resultado.Object, status : 201, sucess : Resultado.sucess })
        } catch (error) {
            next(error)
        }
    }
    async Find(req, res, next){
        
        try {
            let Resultado = await Model.FindAll();
            if(Resultado.status == 500){
               return next(Resultado.erro)
            }
            console.log(Resultado.Object[0].Imagem_1.toString('base64'))
            return res.status(200).json({id : Resultado.Object, status : 201, sucess : Resultado.sucess })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new Controller()