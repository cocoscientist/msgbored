require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
//const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initialisePassport = require('./passport-config')
const userRoutes = require('./routes/UserRouter')
const methodOverride = require('method-override')

initialisePassport(passport)

app.set('views','./views')
app.set('view engine','pug')

app.use('/',userRoutes)
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',(error)=>{
    console.error(error)
})
db.once('open',()=>console.log("Connected to db"))

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',passport.authenticate('local',{
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/main',checkAuthenticate,(req,res)=>{
    console.log(req.user)
    res.render('main',{ username:req.user.username })
})

app.delete('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticate(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect('/login')
    }
}

app.listen(process.env.PORT || 8000,()=>console.log("App started"))