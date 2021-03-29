const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')

router.post('/signup',async (req,res)=>{
    let pass = await bcrypt.hash(req.body.password,10)
    const newUser = new User({
        username: req.body.username,
        password: pass
    })
    try{
        const save = await newUser.save()
        res.redirect('/login')
    }catch(err){
        res.redirect('/signup',{ message: 'Signup Failed' })
    }
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

module.exports = router