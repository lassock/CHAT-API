const express = require('express')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const messagesRouter = require('./routes/message')
const contactsRouter = require('./routes/contact')
const conversationsRouter = require('./routes/conversation')
const mongoose = require('mongoose')
const socketIniter = require('./socket.io')
const validator = require('./validator')
const cors = require('cors')

dotenv.config()
const app = express()

app.use(morgan('dev'))
app.use(
    bodyParser.json({
        limit: '50mb',
    })
)
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        parameterLimit: 100000,
        extended: true,
    })
)
app.use(cors())
app.use(expressValidator())
app.use(validator.config)
app.use('/message', messagesRouter)
app.use('/contact', contactsRouter)
app.use('/conversation', conversationsRouter)
app.use('/views', express.static('views'))
app.use('/public', express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/home.html', (error) => console.log('Error provided : ', error))
})

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to the database...')
})
mongoose.connection.on('error', (err) => {
    console.log('Error when connect to database : ', err)
})

const port = process.env.PORT || '4000'

const server = app.listen(port, () => {
    console.log('chat-api is listen on ' + port)
})

// Socket io, initilisation.
let io = require('socket.io')(server, {
    cors: {
        origin: '*',
        method: ['GET', 'POST'],
    },
})
socketIniter.main_initer(io)