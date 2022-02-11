const express = require('express')
const validator = require('../validator')
const contactController = require('../controllers/contact')
const imageUplaoded = require('../validator/image-uplaolded')
const Contact = require('../models/contact')

const router = express.Router()

router.post('/', [validator.contactValidator], contactController.createContact)
router.get('/', [validator.auth, contactController.getContacts])
router.put('/:id', validator.contactValidator, contactController.updateContact)
router.delete('/:id', contactController.deleteContact)
router.get('/login', contactController.login)
router.get('/login-out', contactController.logout)
router.post(
    '/avatar',
    [validator.auth, imageUplaoded.uplaodAvatar],
    contactController.uplaodProfile,
    (error, req, res, next) => {
        res.status(400).send({ error: error.message })
    }
)
router.get('/avatar/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact || !contact.avatar) {
            throw new Error('Not contact found.')
        }
        res.set('Content-Type', 'image/png')
        res.send(contact.avatar)
    } catch (e) {
        res.status(400).send({ error: 'Not contact found.' })
    }
})

module.exports = router
