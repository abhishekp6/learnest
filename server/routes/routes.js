const express = require('express');
const router = express.Router();
const { getCustomUploadToken } = require('../controllers/handleVideoUpload')

// @ ALL Routes
router.route('/get/custom/upload/token').get(getCustomUploadToken);

module.exports = router;