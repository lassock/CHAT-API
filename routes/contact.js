const express = require('express')
const validator = require('../validator')
const contactController = require('../controllers/contact')

const router = express.Router()

router.post('/', validator.contactValidator, contactController.createContact)
router.get('/', contactController.getContacts)
router.put('/:id', validator.contactValidator, contactController.updateContact)
router.delete('/:id', contactController.deleteContact)
router.get('/login', contactController.login)

module.exports = router
