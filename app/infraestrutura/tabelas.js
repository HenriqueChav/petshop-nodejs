class Tabelas {
    conexao

    init(conexao) {
        this.conexao = conexao
        this.criarAtendimentos()
    }

    criarAtendimentos() {
        const sql = `
            CREATE TABLE IF NOT EXISTS Atendimentos ( 
                id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                cliente varchar(50) NOT NULL,
                pet varchar(20),
                servico varchar(20) NOT NULL,
                status varchar(20) NOT NULL,
                data datetime NOT NULL,
                dataCriacao datetime NOT NULL,
                observacoes text 
            )
        ` // definindo o query SQL a ser executado

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
                return
            }

            console.log('Tabela Atendimentos criada com sucesso.')
        }) // executando o query e uma função callback
    }
}

module.exports = new Tabelas
