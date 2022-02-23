const express = require('express')
const Controller = require('../../src/controller/document_ctrll')
class Routes{
    constructor(){
        this.app = express();
        this.middleware();
        this.routes()
    }

    middleware(){}

    routes(){
        this.app.post('/', Controller.Create)
        this.app.get('/:id', Controller.FindById)
        this.app.get('/', Controller.FindAll)
        this.app.patch('/:id', Controller.Update)
        this.app.delete('/:id', Controller.Delete)
        
        this.app.get('/next/:param', Controller.FindNext)
        this.app.get('/filter/:min/:max', Controller.FindByNumber)
        this.app.get('/filter/:model', Controller.FindByModel)
        this.app.get('/filteryear/:year', Controller.FindByYear)
        this.app.get('/filterkm/:km', Controller.FindByKm)
        // this.app.delete('/', Controller.delete)
        // this.app.patch
    }
}

module.exports = new Routes().app
