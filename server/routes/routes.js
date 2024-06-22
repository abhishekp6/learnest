const express = require('express');
const router = express.Router();
const { getCustomUploadToken } = require('../controllers/handleVideoUpload');
const { getPaymentOrderId, verifyPayment } = require('../controllers/paymentController');
const { getCourseById, saveCourse, updateCourse, featchAll, deleteCourse } = require('../controllers/courseController');
const { health } = require('../controllers/healthCheck');

// @ ALL Routes

router.route('/get/custom/upload/token').get(getCustomUploadToken);
router.route('/create/order').post(getPaymentOrderId);
router.route('/verify/payment').post(verifyPayment);

router.route('/save/course').post(saveCourse);
router.route('/get/courseById/:courseId').get(getCourseById);
router.route('/update/course').patch(updateCourse);
router.route('/fetch/all/course').get(featchAll);
router.route('/delete/course/:courseId').delete(deleteCourse);

router.route('/health/check').get(health);

module.exports = router;