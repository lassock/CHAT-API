const Contact = require('../models/contact')
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
exports.login = (req, res) => {
    console.log('Ree', req.query)
    Contact.findOne({ passowrd: req.query.passowrd, username: req.query.username })
        .then((contact) => {
            return res.status(200).json(contact)
        })
        .catch((error) => res.status(400).json({ error: error }))
}

/**
 * Function to create new contact.
 * @param {*} req 
 * @param {*} res 
 */
exports.createContact = (req, res) => {
    new Contact(req.body).save((err, result) => {
        if (err)
            return res.status(400).json({
                from: 'On save',
                error: err,
            })
        res.status(200).json(result)
    })
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
