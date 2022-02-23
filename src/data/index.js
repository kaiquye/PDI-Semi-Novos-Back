const knex = require('knex')({
    client : 'mysql', 
    connection : {
        host : 'localhost', 
        user : 'root',
        password : '1234', 
        database : 'semi_novos'
    }
})

module.exports = knex