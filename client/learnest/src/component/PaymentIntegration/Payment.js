import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import environment from "../../config/Config";
import config from "../../config/SecretConfig";
import './Payment.css';

const Payments = () => {

    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = environment.RAZORPAY_CHECKOUT;
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const onInputChange = (event) => {
        console.log(event.target.value, "Entered_Amount");
        let enteredAmount = event.target.value;
        setAmount(enteredAmount);
    }

    const intiatePayment = async () => {
        console.log("Payment_Initiated_with_Amount", amount);
        let amountInPaisa = amount*100;

        const options = {
            "key": config.RAZORPAY_KEY_ID,
            "amount": 0,
            "name": "",
            "description": "",
            'order_id':"",
            "handler": function(response) {
                console.log(response);
                var values ={
                    razorpay_signature : response.razorpay_signature,
                    razorpay_order_id : response.razorpay_order_id,
                    transactionid : response.razorpay_payment_id,
                    transactionamount : amount
                    }
                axios.post(environment.VERIFY_PAYMENT, values)
                .then(res=>{alert("Success")})
                .catch(e=>console.log(e))
            },
            "prefill":{
                "name":'First Last',
                "email":'first@gmail.com',
                "contact":'1234567890',
            },
            "notes": {
                "address": "Hello World"
            },
            "theme": {
                "color": "#528ff0"
            }
        };

        // Create Razorpay order
        const createOrderPayload = {
            "amount": amountInPaisa
        }
        try {
            const orderDetails = await axios.post(environment.CREATE_ORDER, createOrderPayload);
            console.log(orderDetails, "ORDER_DETAILS");
            options.order_id = orderDetails.data.id;
            options.amount = orderDetails.data.amount;  
            const paymentPopup = new window.Razorpay(options);
            paymentPopup.open(); 

        } catch (error) {
            console.log(error, "Error");
        }

    }

    return (
      <div>
        <div className="payment-container">
          <div className="payment-box">
            <h2>Make a Payment</h2>
            <input placeholder="Enter Amount" type="text" className="payment-input" onChange={(event) => {onInputChange(event);}} />
            <button className="pay-btn" onClick={() => {intiatePayment();}}>
              Pay
            </button>
          </div>
        </div>
      </div>
    );
}

export default Payments;