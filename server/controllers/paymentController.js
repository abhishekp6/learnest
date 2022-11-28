const Razorpay = require('razorpay');
const crypto = require('crypto')

const PaymentMetaDataSchema =  require('../models/paymentMetadata');

exports.getPaymentOrderId = async (req, res, next) => {
    
    let instance = new Razorpay({
        key_id : process.env.RAZORPAY_KEY_ID,
        key_secret : process.env.RAZORPAY_KEY_SECRET
    })

    let options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture: 1
    }

    instance.orders.create(options, (err, order) => {
        if(err){
            console.log("ORDERID_FAILURE", err);
            res.send(err);
        }
        else{
            console.log("ORDER_ID_GENERATED", order);
            res.json(order);
        }
    })

}

exports.verifyPayment = async (req, res, next) => {
    
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    generated_signature.update(req.body.razorpay_order_id + "|" + req.body.transactionid);

    if(generated_signature.digest('hex') === req.body.razorpay_signature){

        // Save Payment Success Data
        const transaction = new PaymentMetaDataSchema({
            transactionId:req.body.transactionid,
            transactionAmount:req.body.transactionamount
        });

        transaction.save((err, transactionRes) => {
            if(err){
                return res.status(500).send({"statusMessage": "Error While saving transaction details", "response": err});
            }
            else{
                return res.status(200).send({"statusMessage": "Transaction Successfully Registered", "response": transactionRes});
            }
        })
    }
    else{
        res.status(400).send({"statusMessage": "Transaction Failure"});
    }
}