// services

(function(){

'use strict';

// service for getting billing data for a given customer
angular.module("acmeApp").service('getBillingData', function(){
	return {
		getAmountDue: function(uuid,bill_month,bill_year){
			// TODO
			// Call ACME API and return amount due
			// if error returned, return a string error message or null
			// For demo purposes we send back a random number 
			// and if amount is more than 800 we assume it's an error

			var amount_due = Math.random() * 1000;
			amount_due = (amount_due <= 800) ? amount_due : "error";
			console.log("amount_due", amount_due);
			return amount_due;
		}
	}
});

// service for sending out bills to customers
angular.module("acmeApp").service('sendBillingData', function(){
	return {
		sendEmail: function(customer,callback){
			// TODO
			// Call an API for sending this email
			// and return a success or error message
			var message = "Dear" + customer.name + "\n"
						+ "Thank you for using Acme Water for your address at"
						+ customer.address + " " + customer.city + ", " + customer.state
						+ " " + customer.zip + "Your amount due for the period of "
						+ customer.bill_month + "/" + customer.bill_year + " is " + customer.amount_due
						+ "\n" + "Warm Regards, Acme Water";

			// For demo purposes we send back a random number 
			// and if random number is less than 0.1 it's an error
			var error = Math.random();
			error = (error > 0.1) ? null : "error";

			callback(error);

			 
		}
	}
});

})();