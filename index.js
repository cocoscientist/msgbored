require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
//const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initialisePassport = require('./passport-config')

initialisePassport(passport)

app.use(express.urlencoded({ extended:false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
//app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(error)=>{
    console.error(error)
})
db.once('open',()=>console.log("Connected to db"))

app.set('views','./views')
app.set('view engine','pug')

app.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.listen(process.env.PORT || 8000,()=>console.log("App started"))