const express = require('express');
const router = express.Router();
const { getCustomUploadToken, saveCourse } = require('../controllers/handleVideoUpload')

// @ ALL Routes

router.route('/get/custom/upload/token').get(getCustomUploadToken);
router.route('/save/course').post(saveCourse);

module.exports = router;