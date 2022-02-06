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
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({ error: firstError })
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
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({ error: firstError })
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
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({ error: firstError })
    }
    // Proceed to next middleware.
    next()
}
