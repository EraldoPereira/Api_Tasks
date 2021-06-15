const database = require('../infra/database');

exports.saveUser = function (user) {
    return database.one('INSERT INTO usuarios (nome, email, senha, criado_em, atualizado_em) VALUES ($1, $2, $3, $4, $5) RETURNING nome', [
        user.nome, user.email, user.senha, user.criado_em, user.atualizado_em]).catch(error => { return { erro: error } })
}

exports.getUserEmail = function (email){
    return database.oneOrNone('SELECT id_usuario, senha, nome FROM usuarios WHERE email = $1', [email]).catch(error => { return { erro: error } })
}