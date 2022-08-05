const mongoose = require('mongoose')

const lista = mongoose.model('lista', {
    Titulo: String,
    Texto: String
})

module.exports = lista