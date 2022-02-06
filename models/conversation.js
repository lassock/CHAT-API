const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    initer: {
        type: String,
        required: true,
    },
    concern: {
        type: String,
        required: true,
    },
    last_message_id: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Conversation', conversationSchema)
