const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/UserModel')

function initialise(passport){
    const authUserFunc = async (username,password,done)=>{
        let user = await User.findOne({ username: username })
        if(user == null){
            return done(null, false, { message: "No user found" })
        }
        try{
            if(await bcrypt.compare(password,user.password)){
                return done(null,user,{})
            }else{
                return done(null,false,{ message: "Incorrect password"})
            }
        }catch(err){
            return done(err)
        }
    }
    passport.use(new LocalStrategy(authUserFunc))
    passport.serializeUser((user,done)=>done(null,user.username))
    passport.deserializeUser((username,done)=>{
        User.findOne({ username: username },(err,user)=>{
            done(err,user)
        })
    })
}

module.exports = initialise