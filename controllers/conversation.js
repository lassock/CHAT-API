const Conversation = require('../models/conversation')

exports.getConversations = (req, res) => {
    Conversation.find()
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((error) => res.status(400).json({ error: error }))
}
exports.createConversation = (req, res) => {
    const conversation = new Conversation(req.query)
    conversation.save((err, result) => {
        if (err) return res.status(400).json({ err })
        res.status(200).json(result)
    })
}
exports.deleteConversation = (req, res) => {
    const filter = { _id: req.params.id }
    Conversation.deleteOne(filter, (err, result) => {
        if (err) return res.status(400).json(err)
        res.status(200).json(result)
    })
}
exports.setLastMessage = (req, res) => {
    const filter = { _id: req.params.id }
    Conversation.updateOne(filter, req.query, (err, result) => {
        if (err) return res.status(400).json(err)
        res.status(200).json(result)
    })
}
