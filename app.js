const express = require('express')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const messagesRouter = require('./routes/message')
const contactsRouter = require('./routes/contact')
const conversationsRouter = require('./routes/conversation')

dotenv.config()
const app = express()

app.use(morgan('dev'))
app.use(
    bodyParser.json({
        limit: '50mb',
    })
)
app.use(expressValidator())
app.use('/message', messagesRouter)
app.use('/contact', contactsRouter)
app.use('/conversation', conversationsRouter)
app.use('/views', express.static('views'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/home.html', (error) => console.log('Error provided : ', error))
})

const port = process.env.PORT || '4000'

app.listen(port, () => {
    console.log('chat-api is listen on ' + port)
})
