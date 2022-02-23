const Schema = require('../../data')

class Description{

    constructor(){}

    async Create(id, Desc){
        try {
            let Resultado = await Schema.insert({Documento_Veiculo_id : id, Preco : Desc.Preco, Potencia : Desc.Potencia, Torque : Desc.Torque, 
            Km : Desc.Km, Cor : Desc.Cor, Cabine : Desc.Cabine, Relacao_Diferencial : Desc.Relacao_Diferencial, Tipo_Suspensao : Desc.Tipo_Suspensao, 
                 Entre_Eixos : Desc.Entre_Eixos, Capacidade_Combustivel : Desc.Capacidade_Combustivel, Inf_Adicionais : Desc.Inf_Adicionais, Opcionais_Do_Veiculo : Desc.Opcionais_Do_Veiculo }).into('ficha_tecnica')
            return this.Result(Resultado)
        } catch (error) {
            return this.newErro(400, 'erro ao criar '+ error.message+'')
        }
    }

    async FindById(id){
        try {
            let Resultado = await Schema.select('*').from("ficha_tecnica").where({Documento_Veiculo_id : id})
            return this.Result(Resultado)
        } catch (error) {
            return this.newErro(400, 'erro ao busca por id '+ error.message+'')
        }
    }
    async FindAll(id){
        try {
            let Resultado = await Schema.select('*').into('ficha_tecnica');
            return this.Result(Resultado)
        } catch (error) {
            return this.newErro(400, 'erro ao criar todos os dados '+ error.message+'')
        }
    }

    newErro(status, params){
        let err = new Error();
        err.name = status
        err.message = params 
        throw err
    }

    Result(params, error){

        if(params.length <= 0){
            return { sucess : false, Object : params, status : 200 }
        }
        if(!params)
        {
            return {  sucess : false, Object : params, status : 200   }
        }
        if(params === null || params === '' || params === [null] || params === undefined){
            return {  sucess : false, Object : params, status : 200  }
        }
        if(error){
            return { sucess : false, erro : error, status : 500}
        }
        if(params){
            return {  sucess : true, Object : params, status : 200 }
        }
    }
}

module.exports = new Description()