require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

//rota da API
const listRoutes = require('./routes/listRoutes')

app.use('/list', listRoutes)

//rota inicial
app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' });
})


//porta de acesso
mongoose.connect(`${process.env.DATABASE_NAME}//${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`)
app.listen(3000);