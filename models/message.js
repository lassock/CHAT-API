const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
    {
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
    },
    { timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)
