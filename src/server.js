
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const productsRouter = require('../routes/productsRouter')

const app = express()
const httpServer = new HttpServer(app)
const PORT = 8080
const io = new Socket(httpServer)

const { products } = require('../class/productContainer')
const { chats } = require('../class/chatContainer')



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))



io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!')


  socket.emit('productos', await products.getAll())

  socket.on('update', async producto => {
    await products.add( producto )
    io.sockets.emit('productos', await products.getAll())
  })


  socket.emit('mensajes', await chats.getAll());


  socket.on('newMsj', async mensaje => {
      mensaje.date = new Date().toLocaleString()
      mensajesMemory.push( mensaje )
      await chats.add( mensaje )
      io.sockets.emit('mensajes', await chats.getAll());
  })

})


app.use('/api', productsRouter)





const server = httpServer.listen(PORT, () => {
    console.log(`------------------- SERVER READY IN PORT: ${server.address().port}-------------------`)
})
server.on('error', error => console.log(`FATAL ERROR ${error}`))