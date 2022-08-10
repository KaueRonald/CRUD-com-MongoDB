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

app.get('/', (req, res) => {
    res.render("index")
})
//rota inicial
app.get('/list', listRoutes)

//atualizando os itens (PUT, PATCH)
app.patch('/list/:id', listRoutes)

//Buscando itens pelo id
app.get('/list/:id', listRoutes)

//Deletar itens
app.delete('/list/:id', listRoutes)

//porta de acesso
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), function () {
    console.log("Server started on port " + app.get("port"));
  });