const Schema = require('../../data/index');
const erro = require('../../middleware/erro');

class Document {

    constructor(){}

    async Create(Doc, next){
        try {
            const idDocument = await Schema.insert({Proprietario : Doc.Proprietario, Placa : Doc.Placa, Ano : Doc.Ano, Cor : Doc.Cor, Chassi : Doc.Chassi, Modelo : Doc.Modelo, 
                Numero : Doc.Numero, Renavam : Doc.Renavam, titulo : Doc.titulo}).into('documento_veiculo').returning('id')
                return this.Result(idDocument);
        } catch (error) {
            return this.newErro(400, 'erro ao criar um novo documento'+ error.message+'')
        }
    }

    async FindById (Id){
        try {
            let dataList = await  Schema.select('*').from('documento_veiculo')
            .join('ficha_tecnica', 'ficha_tecnica.Documento_Veiculo_id', 'documento_veiculo.id')
            .join('imagem_veiculo', 'imagem_veiculo.Documento_Veiculo_id', 'documento_veiculo.id').where({'documento_veiculo.id' : Id})
            console.log(dataList)
            return this.Result(dataList);
        } catch (error) {
            return this.newErro(400, 'erro ao criar um novo documento'+ error.message+'')
        }
    }

    async FindAll(){
        try {
            let dataList = await Schema.select('*').from('documento_veiculo')
            .join('ficha_tecnica', 'ficha_tecnica.Documento_Veiculo_id', 'documento_veiculo.id')
            .join('imagem_veiculo', 'imagem_veiculo.Documento_Veiculo_id', 'documento_veiculo.id').where('Inativo', false).limit(6)
            return this.Result(dataList)
        } catch (error) {
            return this.newErro(400, 'erro ao buscar todos '+ error.message+'')
        }
    }

    async FindByPlace(Place){
        try {
             const place = await Schema.select('*').from('documento_veiculo').where({Placa : Place})
             console.log(place)
             return this.Result(place)
        } catch (error) {
            return this.newErro(400, 'erro ao busca pela placa '+ erro.message +'')
        }
    }

    async FindByNumber(min, max){
        try {
            const resultado = await Schema.select('*').from('documento_veiculo').join('ficha_tecnica', 'ficha_tecnica.Documento_Veiculo_id', 'documento_veiculo.id').join('imagem_veiculo', 'imagem_veiculo.Documento_Veiculo_id', 'documento_veiculo.id').whereBetween('ficha_tecnica.Preco', [min, max]);
            return this.Result(resultado)
        } catch (error) {
            return this.newErro(400, 'não foi possivel usar o filtro' + erro.message)
        }
    }

    async FindByModel(model){
        try {
            const Resultado = await Schema.select('*').from('documento_veiculo').join('ficha_tecnica', 'ficha_tecnica.Documento_Veiculo_id', 'documento_veiculo.id').join('imagem_veiculo', 'imagem_veiculo.Documento_Veiculo_id', 'documento_veiculo.id').where('documento_veiculo.Modelo', model)
            return this.Result(Resultado)
        } catch (error) {
            return this.newErro(400, 'Nâo foi possivel buscar por Modelo' + erro.message)
        }
    }

    async FindByYear(year){
        try {
            const Resultado = await Schema.select('*').from('documento_veiculo').join('ficha_tecnica', 'ficha_tecnica.Documento_Veiculo_id', 'documento_veiculo.id').join('imagem_veiculo', 'imagem_veiculo.Documento_Veiculo_id', 'documento_veiculo.id').where('documento_veiculo.Ano', year)
            return this.Result(Resultado)
        } catch (error) {
            return this.newErro(400, 'não foi possivel buscar pelo ano ' + erro.message)
        }
    }

    async FindByKm(km){
        try {
            const Resultado = await Schema.select('*').from('documento_veiculo').join('ficha_tecnica', 'ficha_tecnica.Documento_Veiculo_id', 'documento_veiculo.id').join('imagem_veiculo', 'imagem_veiculo.Documento_Veiculo_id', 'documento_veiculo.id').whereBetween('documento_veiculo.Km', [0, km]).where('Inativo', false)
            return this.Result(Resultado)
        } catch (error) {
            return this.newErro(400, 'não foi possivel buscar pelo ano ' + error.message)
        }
    }

    async Update(id, Doc){
        try {
            const Resultado = await Schema.where('id', id).from('documento_veiculo').update({Proprietario : Doc.Proprietario, Placa : Doc.Placa, Ano : Doc.Ano, Cor : Doc.Cor, Chassi : Doc.Chassi, Modelo : Doc.Modelo, 
                Numero : Doc.Numero, Renavam : Doc.Renavam, titulo : Doc.titulo})
                console.log(Resultado, id, Doc)
            return this.Result(Resultado)
            } catch (error) {
                return this.newErro(400, 'não foi possivel buscar pelo ano ' + error.message)
        }
    } 

    async Delete(id){
        try {
            const Resultado = await Schema.where('id', id).del().from('documento_veiculo')
            return this.Result(Resultado)
        } catch (error) {
                return this.newErro(400, 'não foi possivel buscar pelo ano ' + error.message)
        }
    }


    async FindNext(param){
        try {
            const Resultado = await Schema.select('*').from('documento_veiculo').
             join('ficha_tecnica', 'ficha_tecnica.Documento_Veiculo_id', 'documento_veiculo.id').
             join('imagem_veiculo', 'imagem_veiculo.Documento_Veiculo_id', 'documento_veiculo.id').limit(param).where('Inativo', false)
            return this.Result(Resultado)
        }catch(error){
            return this.newErro(400, 'não foi possivel buscar pelo ano ' + error.message)
        }
    }

    newErro(status, params){
        let err = new Error()
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
        if(params === null || params === '' || params === [] || params === undefined){
            return {  sucess : false, Object : params, status : 200  }
        }
        // if(error){
        //     return { sucess : false, erro : error, status : 500}
        // }
        if(params){
            return {  sucess : true, Object : params, status : 200 }
        }
    }

}

module.exports = new Document()