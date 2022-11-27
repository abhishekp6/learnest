const express = require('express');
const router = express.Router();
const { getCustomUploadToken, saveCourse } = require('../controllers/handleVideoUpload');
const { getPaymentOrderId, verifyPayment } = require('../controllers/paymentController');

// @ ALL Routes

router.route('/get/custom/upload/token').get(getCustomUploadToken);
router.route('/save/course').post(saveCourse);
router.route('/create/order').post(getPaymentOrderId);
router.route('/verify/payment').post(verifyPayment);

module.exports = router;