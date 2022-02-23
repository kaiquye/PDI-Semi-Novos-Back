const express = require('express')
const Cors = require('cors')
const erro = require('../../src/middleware/erro/index')
const Document = require('../../src/routers/Document')
const Image = require('../../src/routers/image')
const Description = require('../../src/routers/Description')
class Server {
    constructor(){
        this.app = express();
        this.middleware();
        this.router();
        this.app.use(erro) //todos os erros são direcionados para este middleware;
    }

    middleware(){
        this.app.use(express.json())
        this.app.use(Cors())
    }

    router(){
        this.app.use('/document',  Document)
        this.app.use('/image',Image)
        this.app.use('/description', Description)
    }
}

module.exports = new Server().app;