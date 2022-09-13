const express = require('express');
const router = express.Router();
const { getUploadToken, getVideoUrl } = require('../controllers/handleVideoUpload')

// @ ALL Routes
router.route('/get/token/upload').post(getUploadToken);
router.route('/get/video/url').post(getVideoUrl);

module.exports = router;