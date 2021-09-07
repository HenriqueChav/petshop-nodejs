const express = require('express') // importando modulos
const consign = require('consign')
//const bodyParser = require('body-parser') // forma depreciada de ler o corpo de uma requisição

module.exports = () => {
    const app = express() // instanciando o express na variável 'app'
    
    //app.use(bodyParser.urlencoded({extended: true})) // usando a biblioteca body-parser no app do express (deprecated)
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    consign() // adicionando as rotas da pasta 'controllers' no app do express
        .include('controllers')
        .into(app)

    return app
}
