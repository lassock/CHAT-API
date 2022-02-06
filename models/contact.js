const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    last_name: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Contact', contactSchema)
