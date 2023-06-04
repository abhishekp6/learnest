const express = require('express');
const router = express.Router();
const { getCustomUploadToken } = require('../controllers/handleVideoUpload');
const { getPaymentOrderId, verifyPayment } = require('../controllers/paymentController');
const { getCourseById, saveCourse, updateCourse } = require('../controllers/courseController');

// @ ALL Routes

router.route('/get/custom/upload/token').get(getCustomUploadToken);
router.route('/create/order').post(getPaymentOrderId);
router.route('/verify/payment').post(verifyPayment);

router.route('/save/course').post(saveCourse);
router.route('/get/courseById/:courseId').get(getCourseById);
router.route('/update/course').patch(updateCourse);

module.exports = router;