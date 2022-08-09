require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectToDb = require("./database/db")
const handlebars = require('express-handlebars');
const listRoutes = require('./routes/listRoutes')
const path = require('path');

connectToDb();
app.use(
    express.urlencoded({
        extended: true,
    }),
);

//Public (Arquivos estáticos)
app.use(express.static(path.join(__dirname,'/public')))

// Handlebars (Template-Engine)
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.json());

//rota da API
app.post('/list', listRoutes)

//rota inicial
app.get('/', (req, res) => {
    res.render("index")
})

//porta de acesso
app.listen(3000);