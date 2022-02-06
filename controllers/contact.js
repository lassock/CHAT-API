const Contact = require('../models/contact')

exports.getContacts = (req, res) => {
    Contact.find()
        .then((contacts) => {
            return res.status(200).json(contacts)
        })
        .catch((error) => res.status(400).json({ error: error }))
}
exports.createContact = (req, res) => {
    new Contact(req.query).save((err, result) => {
        if (err) return res.status(400).json({ error: err })
        res.status(200).json(result)
    })
}
exports.deleteContact = (req, res) => {
    const filters = { _id: req.params.id }
    Contact.deleteOne(filters, (err, result) => {
        if (err) return res.status(400).json({ error: error })
        res.status(200).json(result)
    })
}
exports.updateContact = (req, res) => {
    const filters = { _id: req.params.id }
    const data = req.query
    Contact.updateOne(filters, data, (err, result) => {
        if (err) return res.status(400).json({ error: error })
        res.status(200).json(result)
    })
}
