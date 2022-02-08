const Conversation = require('./models/conversation')
const Message = require('./models/message')
const socket_io = require('socket.io')
const { json } = require('body-parser')

const keys = {
    conversations: {
        get: 'get-conversations',
        add: 'add-conversation',
        delete: 'delete-conversation',
        update: 'update-conversation',
    },
    messages: {
        get: 'get-messages',
        add: 'add-message',
        delete: 'delete-message',
        update: 'update-message',
    },
}

/**
 *
 * @param {socket_io.Socket} io
 */
exports.main_initer = (io) => {
    io.on('connection', function (socket) {
        socket.on(keys.conversations.get, (data) => {
            // Get all conversations.
            Conversation.find({
                $or: [{ initer: data.id }, { concern: data.id }],
            })
                .sort({ updatedAt: -1 })
                .populate('initer concern message')
                .exec()
                .then((conversations) => {
                    let d = { user_id: data.id, conversations: conversations.length === 0 ? [] : conversations }
                    io.emit(keys.conversations.get, d)
                })
                .catch((err) => console.log('Error when get conversations : ', err))
        })

        socket.on(keys.conversations.add, (data) => {
            new Conversation(data).save((error, result) => {
                if (error) console.log('Error: ', error)
                Conversation.findOne({ _id: result._id })
                    .populate('initer concern')
                    .exec((error, result) => {
                        if (error) console.log('Error when add/get conversation: ', error)
                        else io.emit(keys.conversations.add, result)
                    })
            })
        })

        socket.on(keys.conversations.delete, (data) => {
            const filter = { _id: data.id }
            Conversation.deleteOne(filter, (error, result) => {
                if (error) console.log('Error: ', error)
                else io.emit(keys.conversations.delete, result)
            })
        })

        socket.on(keys.conversations.update, (data) => {
            const filter = { _id: data.id }
            Conversation.updateOne(filter, data, (error, result) => {
                if (error) console.log('Error: ', error)
                else io.emit(keys.conversations.update, result)
            })
        })

        socket.on(keys.messages.add, (data) => {
            const message = new Message(data.message)
            message.save((err, message) => {
                if (err) console.log('Error when save the message : ', err)
                else {
                    let condi = { _id: data.id }
                    let update = { $addToSet: { message: message._id } }
                    Conversation.findOneAndUpdate(condi, update)
                        .populate('initer concern message')
                        .exec()
                        .then((conv) => {
                            io.emit(keys.messages.get, { id: conv._id, message: message })
                        })
                        .catch((error) => console.log('Error when update/get conversation: ', error))
                }
            })
        })

        socket.on(keys.messages.update, (data) => {
            Message.findOneAndUpdate({ _id: data.message_id }, { is_read: true })
                .then((result) => {
                    Conversation.findOne({ _id: data.conv_id })
                        .populate('initer concern message')
                        .exec()
                        .then((conv) => {
                            io.emit(keys.messages.update, conv)
                        })
                        .catch((error) => console.log('Error when update/get message: ', error))
                })
                .catch((error) => console.log('Error when update message: ', error))
        })

        socket.on('disconnect', function () {
            console.log('user disconnected')
        })
    })
}
