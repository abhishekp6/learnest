const mongoose = require('mongoose');

const PaymentMetaDataSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true
    },
    transactionAmount: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('paymentMetadata', PaymentMetaDataSchema);