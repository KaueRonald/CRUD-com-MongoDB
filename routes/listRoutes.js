const router = require('express').Router()

const lista = require('../models/list')

// Inserindo itens no banco
router.post('/', async (req, res) => {

    const { Titulo, Texto } = req.body

    if (!Titulo) {
        res.status(422).json({ error: 'O titulo é obrigatório para a criação do item!' })
        return
    }
    const item = {
        Titulo,
        Texto
    }

    try {
        await lista.create(item)
        res.status(201).json({ message: 'item de lista inserido' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Buscando os itens
router.get('/', async (req, res) => {

    try {

        const item = await lista.find()
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})



module.exports = router