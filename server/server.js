const express = require('express');
const app = express();


app.use(express.json());

app.use('/', require('./route/tasksRoute'));


app.listen(3000)
console.log("Linten in port: 3000");