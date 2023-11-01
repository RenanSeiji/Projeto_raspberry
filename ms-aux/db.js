const express = require('express')
const axios = require ('axios')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const pedidos = {}
let dbid = 0
// get localhost:4000/pedidos
app.get('/pedidos', (req, res) => {
    res.send(pedidos)  
})

app.post('/pedidos',(req,res)=>{
    const pedido = req.body
    dbid++
    pedidos[dbid] = pedido
    res.status(201).send(pedido)
})
app.listen(4000,()=>{
    console.log('Pedidos. Porta 4000')
})