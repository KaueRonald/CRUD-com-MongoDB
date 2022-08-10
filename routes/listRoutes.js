const router = require('express').Router()
const lista = require('../models/list')

// Inserindo itens no banco
router.post('/list', async (req, res) => {

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
         return res.status(200).render('index')
         

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Buscando os itens
router.get('/list', async (req, res) => {

    try {
        const item = await lista.find()
        res.status(201).json(item)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Buscando itens pelo id
router.get('/list/:id', async (req, res) => {

    const id = req.params.id

    try {
        const list = await lista.findOne({ _id: id })

        if (!list) {
            res.status(422).json({ message: 'o item não foi encontrado!' })
            return
        }
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//atualizando os itens (PUT, PATCH)
router.patch('/list/:id', async (req, res) => {

    const id = req.params.id

    const { Titulo, Texto } = req.body

    const item = {
        Titulo,
        Texto
    }

    try {
        const updatedItem = await lista.updateOne({ _id: id }, item)

        if (updatedItem.matchedCount === 0) {
            res.status(422).json({ message: 'o item não foi encontrado!' })
            return
        }
        res.status(200).json(item)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Deletar itens
router.delete('/list/:id', async (req, res) => {

    const id = req.params.id

    const list = await lista.findOne({ _id: id })

    if (!list) {
        res.status(422).json({ message: 'o item não foi encontrado!' })
        return
    }

    try {

        await list.deleteOne({ _id: id })
        res.status(201).json({ message: 'Item removido com sucesso' })
        

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router