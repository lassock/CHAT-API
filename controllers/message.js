const Message = require('../models/message')

exports.getMessages = (req, res) => {
    Message.find()
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err))
}
exports.getMessage = (req, res) => {
    Message.find({ _id: req.params.id })
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err))
}
exports.createMessage = (req, res) => {
    const message = new Message(req.query)
    message.save((err, result) => {
        if (err) return res.status(400).json(err)
        res.status(200).json(result)
    })
}
exports.deleteMessage = (req, res) => {
    const filter = { _id: req.params.id }
    Message.deleteOne(filter, (err, result) => {
        if (err) return res.status(400).json(err)
        res.status(200).json(result)
    })
}
exports.setAsRead = (req, res) => {
    const filter = { _id: req.params.id }
    const data = req.query
    Message.updateOne(filter, data, (err, result) => {
        if (err) return res.status(400).json(err)
        res.status(200).json(result)
    })
}
