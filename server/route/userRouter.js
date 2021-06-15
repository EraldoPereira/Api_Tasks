const express = require('express');
const router = express.Router();

const userService = require('../service/userService')

router.get('/users');
router.get('/user/:id');
router.post('/user', userService.saveUser);
router.post('/login', userService.login);
router.put('/user/:id');
router.delete('/user/:id');

module.exports = router;