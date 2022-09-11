const express = require('express');
const router = express.Router();
const { getUploadToken, saveVideo } = require('../controllers/handleVideoUpload')

// @ ALL Routes
router.route('/get/token/upload').post(getUploadToken);
router.route('/save/video/url').get(saveVideo);

module.exports = router;