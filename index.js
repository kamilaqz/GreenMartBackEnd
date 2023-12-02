'use strict'

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/greenMart');
require('dotenv').config()
const express = require('express')
const app = express()
const port = 3030

const cors = require('cors')


const productRouter = require('./src/routers/productRouter')
const userRouter = require('./src/routers/userRouter')
const middlewareAuth = require('./src/routers/middlewareAuth');

app.use(express.json())
app.use(cors())
app.use(middlewareAuth)
app.use(productRouter)
app.use(userRouter)





app.listen(port, () => {
  console.log(`O servidor está executando na porta ${port}`)
})
const corsOptions = {
  origin: 'http://localhost:5000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions))

