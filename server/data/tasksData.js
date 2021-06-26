const database = require('../infra/database')

exports.saveTask = function ( task ){
    return database.one('INSERT INTO tasks (descricao, data_estimada, data_concluida, id_proprietario, status, criado_em, atualizado_em) VALUES ( $1, $2, $3, $4, $5, $6, $7 ) RETURNING *',
    [task.descricao, task.data_estimada, task.data_concluida, task.id_proprietario, task.status, task.criado_em, task.atualizado_em]).catch( error => { return { mensagem: error } } )
}

exports.getTasks = function () {
    return database.query('SELECT * FROM tasks').catch(error => { return { mensagem: error } })
}

exports.getTask = function (id_task) {
    return database.oneOrNone('SELECT * FROM tasks WHERE id_task = $1', [id_task]).catch(error => { return { mensagem: error } })
}

exports.updateTask = function( id_task, task ){
    return database.oneOrNone('UPDATE tasks SET descricao = $1, data_estimada = $2, data_concluida = $3, status = $4, atualizado_em = $5 WHERE id_task = $6 RETURNING *',
    [task.descricao, task.data_estimada, task.data_concluida, task.status, task.atualizado_em, id_task]).catch(error => { return { mensagem: error } })
}

exports.deleteTask = function(id_task){
    return database.none('DELETE FROM tasks WHERE id_task = $1', [id_task]).catch(error => { return { mensagem: error } })
}

exports.getTasksForDate = function(data_estimada){
    return database.query('SELECT * FROM tasks WHERE data_estimada <= $1 ORDER BY data_estimada ASC', [data_estimada]).catch(error => { return { mensagem: error } })
}

exports.toggleTask = function(id_task, status){
    return database.oneOrNone('UPDATE tasks SET status = $1 WHERE id_task = $2', [status, id_task]).catch(error => { return { mensagem: error } })
}