const tasksData = require('../data/tasksData');
const dateFormat = require('../help/dateFormat')

exports.saveTask = async function (req, res) {
    console.log(req.body);
    const task = req.body
    task.criado_em = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s')
    task.atualizado_em = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s')
    const response = await tasksData.saveTask(task)
    if (!response.mensagem) {
        console.log("Task adicionada!")
        return res.status(200).json(response)
    } else {
        console.log(response.mensagem);
        return res.status(400).send({ mensagem: "Erro ao salvar tarefa" })
    }
};

exports.getTasks = async function (req, res) {
    const response = await tasksData.getTasks()
    if (!response.mensagem) {
        res.status(200).json(response)
    } else {
        console.log(response.mensagem)
        res.status(400).send({ mensagem: "Erro ao consular o banco de dados" })
    }
}

exports.getTask = async function (req, res) {
    const response = await tasksData.getTask(req.params.id)
    if (response) {
        if (!response.mensagem) {
            return res.status(200).json(response)
        } else {
            console.log(response.mensagem)
            return res.status(400).send({ mensagem: "Erro ao consular o banco de dados" })
        }
    } else {
        return res.status(200).send({ mensagem: "Não encontrado" })
    }
}

exports.updateTask = async function (req, res) {
    const task = req.body
    task.atualizado_em = dateFormat.dateFormat(new Date(), 'Y-m-d h:i:s')
    const response = await tasksData.updateTask(req.params.id, task)
    if (response) {
        if (!response.mensagem) {
            return res.status(200).json(response)
        } else {
            console.log(response.mensagem)
            return res.status(400).send({ mensagem: "Erro ao consular o banco de dados" })
        }
    } else {
        return res.status(200).send({ mensagem: "Não encontrado" })
    }
}

exports.deleteTask = async function (req, res) {
    const response = await tasksData.getTask(req.params.id)
    if (response) {
        if (!response.mensagem) {
            await tasksData.deleteTask(req.params.id)
            return res.status(200).send({ mensagem: "Apagado com sucesso" })
        } else {
            console.log(response.mensagem)
            return res.status(400).send({ mensagem: "Erro ao consular o banco de dados" })
        }
    } else {
        return res.status(200).send({ mensagem: "Não encontrado" })
    }
}

exports.getTasksForDate = async function (req, res) {
    const data = req.query.data + ' 23:59:00'
    console.log(data);
    const response = await tasksData.getTasksForDate(data);
    return res.status(200).json(response)
}

exports.toggleTask = async function(req, res){
    const response = await tasksData.getTask(req.params.id)
    if(response){
        if(response.status){
            await tasksData.toggleTask(response.id_task, false)
        }else{
            await tasksData.toggleTask(response.id_task, true)
        }
        return res.status(200).end()
    }else{
        return res.status(400).send({ mensagem: "Não encontrado" })
    }
    
    
}
