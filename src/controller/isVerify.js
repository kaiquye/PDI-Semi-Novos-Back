const DOCUMENT = require('../../src/models/document')
const IMAGE = require('../../src/models/image')
const DESCRIPTION = require('../../src/models/description')
const fs = require("fs");
const Jimp = require('jimp')
const resizeImg = require('resize-img');
const sharp = require('sharp');
class Controller {
    constructor(){}
    
    toArray(params){
        let param = Object.values(params)
        let array = [];
        for(let i = 0; param.length > i; i++){
            array.push(param[i])
        }   
        return array
    }
    async isExistInDocument(ref){
        var boolean = false;
        try {
            let isexist = await DOCUMENT.FindByPlace(ref);
            console.log(isexist)
            if(isexist.sucess === true){
                console.log('placa ja cadastrada')
                boolean = true;
            }else{
                console.log('placa não cadatrada')
            }
            return boolean;
        } catch (error) {
            return false;
        }
    }
    async isExistInDescription(ref){
        var boolean = false;
        try {
            let isexist = await DESCRIPTION.FindById(ref);
            console.log(isexist)
            if(isexist.sucess === true){
                console.log('ja exite um id cadastrado ')
                boolean = true;
            }else{
                console.log('placa não cadatrada')
            }
            return boolean;
        } catch (error) {
            return false;
        }
    }
    async isExistInImage(ref){
        var boolean = false;
        try {
            let isexist = await IMAGE.FindById(ref);
            console.log(isexist)
            if(isexist.sucess === true){
                console.log('ja exite um id cadastrado')
                boolean = true;
            }else{
                console.log('placa não cadatrada')
            }
            return boolean;
        } catch (error) {
            return false;
        }
    }
    isNull(params){
        var boolean = true;
        params.map((param)=>{
            if(param === null || param === '' || param === ' '){
                console.log(param)
                boolean = false
            }
        })
        return boolean
    }
    toBase64(file){
        //convertendo para base64
        return fs.readFileSync(__dirname + '/image_ctrll/image/' +file+'', 'base64');

    }
    toBuffer(params){
        //convertendo para buffer
        return new Buffer(params, 'base64')
    }
    async ImageSave(req, res, next){
        const imagems = []
        console.log(req)
        let files = req.files;
        let lenghtFiles = files.length
        files.forEach( async imagem => {
            //  pesquisando pela imagem na pasta - / - Redimensionando a imagem - / -  Pegando a imagem em Buffer para salva-la no banco de dados 
            const resultado  = await sharp(fs.readFileSync(__dirname + '/image_ctrll/image/' + imagem.filename)).resize(500).webp().toBuffer()
            imagems.push(resultado) //salvando no array
            if(imagems.length >= lenghtFiles){ //nesta parte eu verifico se o array e maior do que 3, se não, ele volta para o loop ate setar as img no array
                req.imagems = imagems // desta forma, eu evito de passa o array vazio para a camada do controller
                next() 
            }
        });
    }
    async resizeImageBasic(image){
        return resizeImg(fs.readFileSync(__dirname + '/image_ctrll/image/' +image+''), { width: 200, height: 200 })
    }
    async resizeImageTest(image){
                 files.map( async (imagem)=>{
                // await this.jimp(imagem.filename)
                // let resultado = await (await Jimp.read(__dirname + '/image_ctrll/image/' + imagem.filename)).resize(500, 500).getBufferAsync(Jimp.MIME_PNG)
                let resultado  = await sharp(fs.readFileSync(__dirname + '/image_ctrll/image/' + imagem.filename)).resize(500).webp().toBuffer()
                // var imagemResult = this.toBuffer(this.toBase64(imagem.filename));
                console.log('----------------')
                imagems.push(resultado)
            })
    }
    async jimp(files){
          const img  = await (await Jimp.read(__dirname + '/image_ctrll/image/' + files)).resize(200, 200)
          let teste =  await img.getBufferAsync(Jimp.MIME_PNG)
          console.log(teste)
          return teste
    }
}

module.exports = new Controller()