const express = require('express')
const validator = require('../validator')
const messageController = require('../controllers/message')

const router = express.Router()

router.post('/', validator.messageValidator, messageController.createMessage)
router.get('/', messageController.getMessages)
router.get('/:id', messageController.getMessage)
router.put('/:id', validator.messageValidator, messageController.setAsRead)
router.delete('/:id', messageController.deleteMessage)

module.exports = router
