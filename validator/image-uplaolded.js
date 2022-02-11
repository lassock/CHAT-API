const multer = require('multer')

const uplaod = multer({
    // dest: './public/images/avatars',
    limits: {
        fileSize: 1000000, // Max size of image is 1mb
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|JPEG|png)$/)) {
            cb(new Error('Please file we be an image web extension jpg png or jpeg.'))
        }
        cb(undefined, true)
    },
})

exports.uplaodAvatar = uplaod.single('avatar')
