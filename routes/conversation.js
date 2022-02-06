const express = require('express')
const validator = require('../validator')
const conversationController = require('../controllers/conversation')

const router = express.Router()

router.post('/', validator.conversationValidator, conversationController.createConversation)
router.get('/', conversationController.getConversations)
router.put('/:id', validator.conversationValidator, conversationController.setLastMessage)
router.delete('/:id', conversationController.deleteConversation)

module.exports = router
