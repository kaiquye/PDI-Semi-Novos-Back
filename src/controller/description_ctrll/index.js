const Model = require('../../models/description')
const is = require('../../controller/isVerify')

class Controller {
    constructor(){}

    async Create(req, res, next){
        let {id} = req.params
        //transforma o body em array
        let array = is.toArray(req.body);
        //verifica se ja exite no banco
        if(await is.isExistInDescription(id)){
            return res.status(203).json({sucess : false, status : 203,  erro : 'ja exite uma descrição cadastrada com esse id'}) // não authorizado
        }
        //verifica se tem algum campo null
        if(!is.isNull(array)){
            return res.status(203).json({sucess : false, status : 203, erro : 'tentando inserir campos nullos no banco de dados'}) // não authorizado
        }
        try {
            let Resultado = await Model.Create(id, req.body)
            if(Resultado.status === 500){
                return next(Resultado.erro)
            }
            return res.status(200).json({id : Resultado.Object, status : 201, sucess : Resultado.sucess })
        } catch (error) {
            next(error)
        }
    }
    async Find(req, res, next){
        let {id} = req.params
        try {
            let Resultado = await Model.FindById(id);
            if(Resultado.status === 500){
                return next(Resultado.erro)
            }
            return res.status(200).json({data : Resultado.Object, status : 200, sucess : Resultado.sucess})
        } catch (error) {
            next(error)
        }
    }
    async FindAll(req, res, next){
        try {
            let Resultado = await  Model.FindAll();
            if(Resultado.status === 500){
                return next(Resultado.erro)
            }
            return res.status(200).json({data : Resultado.Object, status : 200, sucess : Resultado.sucess})
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = new Controller()