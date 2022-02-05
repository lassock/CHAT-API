const express = require('express')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

app.use(morgan('dev'))
app.use(expressValidator())

app.get('/',function(req,res){
    res.send('hello world')
})

const port = process.env.PORT || "4000"

app.listen(port , ()=>{
    console.log("chat-api is listen on " + port)
})