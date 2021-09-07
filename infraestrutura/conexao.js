const mysql = require('mysql')

const conexao = mysql.createConnection({ // criando conexão com o banco de dados, passando as configs em um objeto
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'agenda-petshop'
})

module.exports = conexao
