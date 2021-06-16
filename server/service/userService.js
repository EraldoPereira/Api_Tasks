const userData = require('../data/userData')
const dateFormat = require('../help/dateFormat')
const { authSecret } = require('../../.env')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


exports.saveUser = async (req, res) => {
    console.log(req.body);
    const user = req.body
    if (user.nome === undefined || user.email === undefined || user.senha === undefined) {
        return res.status(400).send({ mensagem: "Dados invalidos" })
    } else {
        user.criado_em = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s')
        user.atualizado_em = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s')
        bcrypt.hash(user.senha, 10, async (errBcrypt, hash) => {
            if (errBcrypt) {
                console.log("Erro: ", errBcrypt)
                return res.status(500).send({ mensagem: "Erro bcrypt" })
            } else {
                user.senha = hash
                const response = await userData.saveUser(user)
                if (response.erro) {
                    console.log("Erro: ", response.erro.detail)
                    return res.status(400).send({ mensagem: 'Falha ao salvar usuario' })
                } else {
                    return res.status(200).json(response)
                }
            }
        })

    }
}

exports.login = async (req, res) => {
    console.log(req.body);
    const user = await userData.getUserEmail(req.body.email)
    if (user) {
        bcrypt.compare(req.body.senha, user.senha, (error, result) => {
            if (error) {
                return res.status(401).send({ mensagem: "Falha na autenticação" })
            }
            if (result) {
                const token = jwt.sign({
                    id_usuario: user.id_usuario,
                    email: user.email,
                    nome: user.nome
                }, authSecret, { expiresIn: '10h' });
                return res.status(200).send({
                    mensagem: "Autenticado com sucesso", id_usuario: user.id_usuario, nome: user.nome, token: token
                })
            }
            return res.status(401).send({ mensagem: "Falha na autenticação" })
        })
    } else {
        return res.status(401).send({ mensagem: "Usuário não cadastrado" })
    }
}

exports.getUserEmail = async (req, res) => {

}