const Atendimento = require('../models/atendimentos')

// exportando uma função que recebe o parâmetro app, para realizar os comandos nele
module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Requisição realizada com sucesso!')
    })

    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    }) // definindo o que o usuário receberá usando GET nessa rota

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.buscaPorId(id, res)
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento, res) // passando o objeto recebido para o model Atendimento
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleta(id, res)
    })
}
