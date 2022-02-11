const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const contactSchema = mongoose.Schema(
    {
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
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: Buffer,
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
)

contactSchema.methods.toJSON = function () {
    const contact = this
    const contactObject = contact.toObject()

    delete contactObject.password
    delete contactObject.tokens
    delete contactObject.avatar

    return contactObject
}

// Generate contact token (instance method).
contactSchema.methods.generateContactToken = async function () {
    const contact = this

    const token = await jwt.sign({ _id: contact._id.toString() }, 'thisismytokencourse')
    contact.tokens = contact.tokens.concat({ token })
    await contact.save()

    return token
}

// Credential to login user (model method).
contactSchema.statics.findContactCredential = async (username, password) => {
    const contact = await Contact.findOne({ username: username })

    if (!contact) {
        throw new Error('Contact is not fond')
    }

    const isMatch = await bcrypt.compare(password, contact.password)

    if (!isMatch) {
        throw new Error('Contact is not matched')
    }

    return contact
}

// Middleware of the schame to hash the contact password.
contactSchema.pre('save', async function (next) {
    const contact = this

    if (contact.isModified('password')) {
        contact.password = await bcrypt.hash(this.password, 8)
    }

    next()
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
