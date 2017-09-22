// root app
(function(){

'use strict';

// create module
var acmeApp = angular.module("acmeApp",[]);

// create controller for the view and load necessary services
acmeApp.controller('dataController', ['$scope', '$http', 'getBillingData', 'sendBillingData', 
	function($scope, $http, getBillingData, sendBillingData){
	
	// function getCustomers takes a source (url) and returns list of customers
	$scope.getCustomers = function(source){

		// initialize error to empty
		$scope.error = "";

		// initialize data to empty
		$scope.data = "";

		// check if there is a source
		if (source && source.indexOf(".csv") > 0 ) {

			// use $http service to read data from the source
			$http.get(source).success(function(data){

				// if data retrieved, split it by line
				var data = data.split("\n");

				// if data retrieved, split it by column
				for (var i = 0; i < data.length; i++) {
					data[i] = data[i].split(",");
				}

				// if data is an array, return it to the view
				if (data && typeof data == 'object') {
					$scope.data = data;
				} else {
					$scope.error = "Error reading data";
				}

			}).error(function(err){
				$scope.error = "Error occured. Please make sure the data source is valid";
			});
	
		} else {
			$scope.error = "Please provide a data source";
		}
	}

	$scope.sendBills = function(data,billing_period){

		// TODO
		// Check if arguments are valid
		var billing_month = billing_period.split("/")[0];
		var billing_year = billing_period.split("/")[1];

		$scope.billing_errors = "";

		// initialize array to track billing errors 
		var errors = [];

		// loop through customers 
		for (var i = 1; i < data.length; i++) {
			
			// collect data for each customer
			var customer = {
					uuid: data[i][0],
					name: data[i][1],
					email: data[i][2],
					address: data[i][3],
					city: data[i][4],
					state: data[i][5],
					zip: data[i][6],
					bill_month: billing_month,
					bill_year: billing_year,
					amount_due: getBillingData.getAmountDue(this.uuid,this.bill_month,this.bill_year)			
			}

			// if a valid amount_due 
			if (typeof customer.amount_due == "number") {
				sendBillingData.sendEmail(customer,function(error){
					if (error){
						errors.push("Error sending bill to " + customer.uuid);
					}
				});
			} else {
				errors.push("No valid amount due for " + customer.uuid);
			}

		}

		// return errors to the view 
		$scope.billing_errors = errors;	
	}
}]);

})();