const express = require('express')
const { products } = require('../class/productContainer')
const { mock5 } = require('../class/mockFaker')

const { Router } = express   
const productRouter = Router() 




productRouter.get('/productos', async (req, res) => {
  const allProducts = await products.getAll()
  res.json( allProducts )
})


productRouter.get('/productos/:id', async (req, res) => {
  const id = Number(req.params.id)
  const product = await products.getById( id )
  product ? res.json( product )
    : res.status(404).send({ error: 'producto no encontrado'})
})


productRouter.post('/productos', async (req, res) => {
  const productToAdd = req.body
  await products.add( productToAdd )
  res.redirect('/')
})



productRouter.put('/productos/:id', async (req, res) => {
  const id = Number(req.params.id)
  const productToModify = req.body

  if(await products.modifyById( id, productToModify )){
    res.send({ message: 'producto modificado'})
  } else {
    res.status(404).send({ error: 'producto no encontrado'})
  }
})



productRouter.delete('/productos/:id', async (req, res) => {
  const id = req.params.id
  if (await products.deleteById(id)) {
    res.send({ message: 'producto borrado'})
  } else {
    res.status(404).send({ error: 'producto no encontrado'})
  }
})



productRouter.get('/productos-test', async (req, res) => {
  const allProducts = await mock5.getAll()
  res.json( allProducts )
})


module.exports = productRouter