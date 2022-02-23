const Controller = require('../../src/controller/image_ctrll')
const MULTER = require('../../src/middleware/multer/index')
const express = require('express')
const is = require('../../src/controller/isVerify')
class Routes{
    constructor(){
        this.app = express();
        this.middleware();
        this.routes();
    }
    middleware(){}
   async routes(){
        this.app.post('/:id',  MULTER.array('image', 10), is.ImageSave ,  Controller.Create )
        this.app.get('/', Controller.Find)
    }
}

module.exports = new Routes().app