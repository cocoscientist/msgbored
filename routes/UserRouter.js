const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')

/*async function hashPassword(password){
    try{
        let pass = await bcrypt.hash(password,10)
        return pass
    }catch(err){
        return err
    }
}*/

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
        res.redirect(400,'/signup',{ message: 'Signup Failed' })
    }
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

module.exports = router