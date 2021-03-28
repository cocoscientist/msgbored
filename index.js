require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(error)=>{
    console.error(error)
})
db.once('open',()=>console.log("Connected to db"))

app.set('views','./views')
app.set('view engine','pug')

app.listen(process.env.PORT || 8000,()=>console.log("App started"))