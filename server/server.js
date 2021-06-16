const express = require('express');
const app = express();
const cors = require('cors')


app.use(express.json());
app.use(cors({ origin: '*' }))

app.use('/', require('./route/tasksRoute'));
app.use('/', require('./route/userRouter'));


app.listen(3000)
console.log("Linten in port: 3000");