const Contact = require('../models/contact')
const sharp = require('sharp')

/**
 * Functiont to get all contacts.
 */
exports.getContacts = (req, res) => {
    Contact.find()
        .then((contacts) => {
            return res.status(200).json(contacts)
        })
        .catch((error) => res.status(400).json({ error: error }))
}

/**
 * Function to login a contact.
 */
exports.login = async (req, res) => {
    try {
        const contact = await Contact.findContactCredential(req.query.username, req.query.password)
        const token = await contact.generateContactToken()
        res.status(200).send({ contact, token })
    } catch (e) {
        res.status(400).send()
    }

    // Contact.findOne({ passowrd: req.query.passowrd, username: req.query.username })
    //     .then((contact) => {
    //         return res.status(200).json(contact)
    //     })
    //     .catch((error) => res.status(400).json({ error: error }))
}

/**
 * Function to logout a contact.
 */
exports.logout = async (req, res) => {
    try {
        req.contact.tokens = req.contact.tokens.filter((item) => item.token !== req.token)
        req.contact.save()
        res.status(200).send({})
    } catch (e) {
        res.status(400).send()
    }

    // Contact.findOne({ passowrd: req.query.passowrd, username: req.query.username })
    //     .then((contact) => {
    //         return res.status(200).json(contact)
    //     })
    //     .catch((error) => res.status(400).json({ error: error }))
}

/**
 * Function to create new contact.
 * @param {*} req
 * @param {*} res
 */
exports.createContact = async (req, res) => {
    const contact = new Contact(req.body)
    try {
        await contact.save()
        const token = await contact.generateContactToken()
        res.status(200).json({ contact, token })
    } catch (e) {
        res.status(400).json({
            from: 'On save',
            error: e,
        })
    }
}

/**
 * Function to delete a contact.
 * @param {*} req
 * @param {*} res
 */
exports.deleteContact = (req, res) => {
    const filters = { _id: req.params.id }
    Contact.deleteOne(filters, (err, result) => {
        if (err) return res.status(400).json({ error: error })
        res.status(200).json(result)
    })
}

/**
 * Function to update contact.
 * @param {*} req
 * @param {*} res
 */
exports.updateContact = (req, res) => {
    const filters = { _id: req.params.id }
    const data = req.body
    Contact.updateOne(filters, data, (err, result) => {
        if (err) return res.status(400).json({ error: error })
        res.status(200).json(result)
    })
}

exports.uplaodProfile = async (req, res) => {
    const contact = req.contact
    const buffer = await sharp(req.file.buffer).resize({ height: 250, width: 250 }).png().toBuffer()
    contact.avatar = buffer
    await contact.save()
    res.send({ contact })
}
