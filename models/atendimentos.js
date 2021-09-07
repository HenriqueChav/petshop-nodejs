const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento { // criando classe onde todas as validações de atendimentos serão feitas para as salvar no banco de dados
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        atendimento.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        const dataEhValida = moment(atendimento.data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'O nome do cliente deve ter pelo menos 5 caracteres.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            atendimento = {...atendimento, dataCriacao}
            
            const sql = `INSERT INTO Atendimentos SET ?` 

            conexao.query(sql, atendimento, (erro, resultados) => { // inserindo o objeto atendimento no banco de dados
                if (erro) {
                    res.status(400).json(erro)
                    return
                }

                res.status(201).json(atendimento) // resultados da inserção
            })
        }       
    }

    lista(res) {
        const sql = `SELECT * FROM atendimentos`

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
                return
            }

            res.status(200).json(resultados)
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            const resultado = resultados[0]
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }

    altera(id, valores, res) {
        const sql = `UPDATE atendimentos SET ? WHERE id = ?`

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
                return
            } 

            if (valores.data) {
                valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
            }

            res.status(200).json({...valores, id})
        })
    }

    deleta(id, res) {
        const sql = `DELETE FROM atendimentos WHERE id = ?`

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
                return
            }

            res.status(200).json({id})
        })
    }
}

module.exports = new Atendimento
