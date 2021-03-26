const express = require('express')
const app = express()

app.set('views','./views')
app.set('view engine','pug')

app.listen(process.env.PORT || 8000,()=>console.log("App started"))