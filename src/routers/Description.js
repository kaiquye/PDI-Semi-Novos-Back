const express = require('express')
const Controller = require('../../src/controller/description_ctrll/index')

class Routes {
    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }
    middleware(){}

    routes(){
        this.app.post('/:id', Controller.Create)
        this.app.get('/:id', Controller.Find)
        this.app.get('/', Controller.FindAll)
    }
}
module.exports = new Routes().app