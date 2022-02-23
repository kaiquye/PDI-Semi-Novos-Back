const Schema = require('../../data')

class Image {

    constructor(){}

    async Create(img, id){
        let imagems = img;
        try {
             let resultado = await Schema.insert({Documento_Veiculo_id : id, imagem_1 : imagems[0] || null, imagem_2 : imagems[1] || null, imagem_3 : imagems[2] || null, 
                imagem_4 :  imagems[3] || null, imagem_5 :  imagems[4] || null, imagem_6 : imagems[5] || null, imagem_7 :  imagems[6] || null, imagem_8 : imagems[7] || null, imagem_9: imagems[8] || null, imagem_10 :  imagems[9] || null})
                .into('imagem_veiculo')
                return this.Result(resultado)
        } catch (error) {
            return this.newErro(400, 'erro ao criar '+ error.message+'')
        }   
    }

    async FindById(id){
        try {
            let resultado = await Schema.select('*').from('imagem_veiculo').where({Documento_Veiculo_id : id})
            return this.Result(resultado)
        } catch (error) {
            return this.newErro(400, 'erro ao buscar por id '+ error.message+'')
        }
    }

    async FindAll(){
        try {
            let resultado = await Schema.select('*').from('imagem_veiculo')
            return this.Result(resultado)
        } catch (error) {
            return this.newErro(400, 'erro ao buscar todos  '+ error.message+'')
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

module.exports = new Image()