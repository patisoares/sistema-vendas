const {Pool} = require('pg')

const db = new Pool({
    user:'postgres',
    host:'localhost',
    database:'sistema_vendas',
    password:'Postgre6*',
    port:5432
})
db.connect()
module.exports = {db}