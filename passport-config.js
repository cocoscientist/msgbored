const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/UserModel')

function initialise(passport){
    passport.use(new LocalStrategy(
        async function(username,password,done){
            User.findOne({ username: username},(err,user)=>{
                if(err){
                    return done(err)
                }
                if(!user){
                    return done(null,false,{ message: "Incorrect Username" })
                }
                if(await bcrypt.compare(password,user.password)){
                    return done(null,user,{})
                }else{
                    return done(null,false,{ message: "Incorrect Password" })
                }
            })
        }
    ))
    passport.serializeUser((user,done)=>done(null,user._id))
    passport.deserializeUser((id,done)=>done(null,getUserById(id)))
}

module.exports = initialise