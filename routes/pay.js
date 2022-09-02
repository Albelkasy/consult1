const router = require("express").Router();
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AdYxB7WJqo5Lm-mJIMCLb2C-h4kSD2K8gb26R_tavjAGdS2FZ-TQwtbOAIiITGIHauTl2cU2AC2UIoyV',
    'client_secret': 'EBcWxOAsVyVWmj8EUZuW5mKpIQ5zY2dPD05BFHOTlFcOGN7XoC3wogzJU3_5YmBNgfNd_ChFxo4GwgRx'
});




router.post('/pay', (req, res) => {
    amount = req.body.price
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://consultant1.herokuapp.com/api/pay/success",
            "cancel_url": "https://consultant1.herokuapp.com/api/pay/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": amount,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": amount
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

})

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": amount
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));


module.exports = router;
