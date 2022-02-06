const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    conversation_id: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    send_at: {
        type: Date,
        required: true,
    },
    is_read: {
        type: Boolean,
        required: true,
    },
})

module.exports = mongoose.model('Message', messageSchema)
