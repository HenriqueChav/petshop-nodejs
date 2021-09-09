const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

const app = customExpress()

const port = 3000

conexao.connect((erro) => { // função para quando for realizada a conexão com o banco de dados, passando um possível erro como parâmetro
    if (erro) {
        console.log(erro)
        return
    }

    console.log('Conectado com sucesso!') // se não haver erro na conexão com o bd, subimos o servidor

    Tabelas.init(conexao) // iniciando tabelas do bd

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`)
    }) // subindo o servidor na porta 3000
})
