const is = require('../isVerify')
const Model = require('../../models/document/index')

class Controller {

    constructor(){}

    async Create(req, res, next){
        let array = is.toArray(req.body)
        if(!is.isNull(array)){
            return res.status(203).json({sucess : false, status : 203, erro : 'tentando inserir campos nullos no banco de dados'}) // não authorizado
        }
        if( await is.isExistInDocument(req.body.Placa)){
            return res.status(203).json({sucess : false, status : 203, erro : 'placa ja cadastrada'}) // não authorizado
        }
        try {
            let Resultado = await Model.Create(req.body);
            return res.status(200).json({id : Resultado.Object, status : 201, sucess : Resultado.sucess })
        } catch (error) {
            next(error)
        }
    }

    async Delete(req, res, next){
        let {id} = req.params
        try {
            let Resultado = await Model.Delete(id);
            return res.status(200).json({data : Resultado.Object, status : Resultado.status, sucess : Resultado.sucess})
        } catch (error) {
            next(error)
        }
    }

    async FindAll(req, res, next){
        try {
            let Resultado =  await Model.FindAll();
            return res.status(200).json({data : Resultado.Object, status : Resultado.status, sucess : Resultado.sucess})
        } catch (error) {
            next(error)
        }
    }
    async FindById(req, res, next){
        let {id} = req.params;
        try {
            let Resultado = await Model.FindById(id);
            return res.status(200).json({data : Resultado.Object.length <= 0 ? 'não encontrado' : Resultado.Object , status : 200, sucess : Resultado.sucess  })
        } catch (error) {
            next(error)
        }
    }
    async Update(req, res, next){
        let {id} = req.params
        console.log(req)
        try {
            let Resultado = await Model.Update(id, req.body)            
            return res.status(200).json({id : Resultado.Object, status : 201, sucess : Resultado.sucess })
        } catch (error) {
            next(error)
        }
    }
    async FindByNumber(req, res, next){
        let {min, max} = req.params;
        console.log(min, max)
        try {
            let Resultado = await Model.FindByNumber(min, max);
            return res.status(200).json({data : Resultado.Object, status : 200, sucess : Resultado.sucess})
        } catch (error) {
            next(error)
        }
    }
    async FindByModel(req, res, next){
        let {model} = req.params
        try {
            let Resultado = await Model.FindByModel(model);
            return res.status(200).json({data : Resultado.Object, status : 200, sucess : Resultado.sucess})
        } catch (error) {
            next(error)
        }
    }
    async FindByYear(req, res, next){
        let {year} = req.params
        try {
            let Resultado = await Model.FindByYear(year);
            return res.status(200).json({data : Resultado.Object, status : 200, sucess : Resultado.sucess})
        } catch (error) {
            next(error)
        }
        
    }
    async FindByKm(req, res, next){
        let {km} = req.params
        try {
            let Resultado = await Model.FindByKm(km)
            return res.status(200).json({data : Resultado.Object, status : 200, sucess : Resultado.sucess})
        } catch (error) {
            next(error)
        }
    }
    async FindNext(req, res, next){
        let {param} = req.params
        try {
            let Resultado = await Model.FindNext(param)
            return res.status(200).json({data : Resultado.Object, status : 200, sucess : Resultado.sucess})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new Controller()