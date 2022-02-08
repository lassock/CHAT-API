const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema(
    {
        initer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact',
        },
        concern: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact',
        },
        message: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
            },
        ],
    },
    { timestamps: true }
)

module.exports = mongoose.model('Conversation', conversationSchema)
