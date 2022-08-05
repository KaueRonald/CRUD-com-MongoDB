require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const lista = require('./models/list')

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

//rota inicial
app.get('/', (req, res) => {
    res.json({message: 'Oi Express!'});
})


//porta de acesso

app.listen(3000);