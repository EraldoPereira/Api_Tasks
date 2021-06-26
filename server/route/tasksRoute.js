const express = require('express');
const router = express.Router();

const tasksService = require('../service/tasksService')

router.get('/tasks', tasksService.getTasks);
router.get('/tasksemail', tasksService.getTasksForDate);
router.get('/tasks/:id', tasksService.getTask);
router.post('/tasks', tasksService.saveTask);
router.put('/tasks/:id', tasksService.updateTask);
router.put('/tasks/toggle/:id', tasksService.toggleTask);
router.delete('/tasks/:id', tasksService.deleteTask);

module.exports = router;