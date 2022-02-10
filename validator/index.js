const jwt = require('jsonwebtoken')
const Contact = require('../models/contact')

exports.config = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token'
    )
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
}

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        if (!token) {
            throw new Error()
        } else {
            const decoded = await jwt.verify(token, 'thisismytokencourse')
            const contact = await Contact.findOne({ _id: decoded._id, 'tokens.token': token })

            if (!contact) {
                throw new Error()
            } else {
                req.contact = contact
                req.token = token
                next()
            }
        }
    } catch (e) {
        res.status(404).send({ message: 'Contact dont get authorization to do this.' })
    }
}

exports.messageValidator = (req, res, next) => {
    req.check('conversation_id', 'Conversation id could not be empty.').notEmpty()
    req.check('sender', 'Sender id could not be empty.').notEmpty()
    req.check('content', 'Content could not be empty.').notEmpty()
    req.check('send_at', 'Send at could not be empty.').notEmpty()
    req.check('is_read', 'Is read could not be empty.').notEmpty()
    // get all errors
    const errors = req.validationErrors()
    // if errors show the frist one as they happen.
    if (errors) {
        return res.status(400).json({ error: errors })
    }
    // Proceed to next middleware.
    next()
}

exports.contactValidator = (req, res, next) => {
    req.check('last_name', 'Last name could not be empty.').notEmpty()
    req.check('first_name', 'First name could not be empty.').notEmpty()
    req.check('username', 'Username could not be empty.').notEmpty()
    req.check('password', 'Password could not be empty.').notEmpty()
    // get all errors
    const errors = req.validationErrors()
    // if errors show the frist one as they happen.
    if (errors) {
        return res.status(400).json({ error: errors })
    }
    // Proceed to next middleware.
    next()
}

exports.conversationValidator = (req, res, next) => {
    req.check('initer', 'Initer could not be empty.').notEmpty()
    req.check('concern', 'Concern could not be empty.').notEmpty()
    req.check('last_message_id', 'Last message could not be empty.').notEmpty()
    // get all errors
    const errors = req.validationErrors()
    // if errors show the frist one as they happen.
    if (errors) {
        return res.status(400).json({ error: errors })
    }
    // Proceed to next middleware.
    next()
}
