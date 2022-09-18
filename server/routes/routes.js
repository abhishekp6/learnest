const express = require('express');
const router = express.Router();
const { getUploadToken, getVideoUrl, getCustomUploadToken } = require('../controllers/handleVideoUpload')

// @ ALL Routes
router.route('/get/token/upload').post(getUploadToken);
router.route('/get/video/url').post(getVideoUrl);
router.route('/get/custom/upload/token').get(getCustomUploadToken);

module.exports = router;