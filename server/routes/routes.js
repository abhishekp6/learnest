const express = require('express');
const router = express.Router();
const { getCustomUploadToken, saveCourse } = require('../controllers/handleVideoUpload');
const { getPaymentOrderId, verifyPayment } = require('../controllers/paymentController');
const { getCourseById } = require('../controllers/getCourseData');

// @ ALL Routes

router.route('/get/custom/upload/token').get(getCustomUploadToken);
router.route('/save/course').post(saveCourse);
router.route('/create/order').post(getPaymentOrderId);
router.route('/verify/payment').post(verifyPayment);
router.route('/get/courseById/:courseId').get(getCourseById);

module.exports = router;