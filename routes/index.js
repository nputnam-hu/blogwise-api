const express = require('express')
const s3 = require('../controllers/s3')

const router = express.Router()

/*
 * S3 Routes
 */

router.route('/s3/logo').put(s3.uploadLogo)

router.route('/s3/json').put(s3.uploadJSON)

module.exports = router
