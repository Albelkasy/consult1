const app = require('express').Router();
const   {Checkout} = require('checkout-sdk-node');


app.post('/payment',async(req,res)=>{


let cko = new Checkout('CU3K_dv4QX-pt9GLwiznNpNurwMW3Y3W2lw9_KThGojGHyIoet5ZnHQaGGu-RGRokUrE11WXreoKf4Q4W9Mdog', {
	client: 'ack_3hmgxeunajzu3l4qshu6dkqebe',
	scope: ['gateway'], // array of scopes
	environment: 'sandbox', // or "production"
});

try {
	let payment = await cko.payments.request({
		source: {
			type: 'card',
			number:req.body.number,
			expiry_month: req.body.expiry_month,
			expiry_year: req.body.expiry_year,
			name:req.body.name,
			cvv:req.body.cvv,
			stored:false,
			store_for_future_use:false
		},
		amount: req.body.amount*100,
		currency: 'USD',
		payment_type: 'Regular',
		reference: `${Math.random()*100000000000000000}`,
		description: 'Mint Tea',
	});
	 res.json({payment,message:"success",status:true});
} catch (err) {
	res.json({message:err.body.error_codes,status:false});
}
})

module.exports = app