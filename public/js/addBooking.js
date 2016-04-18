







function addBooking(i,cb){
	DB.collection('bookings').insertOne({ 

		"passenger": {
			"firstName":i.passenger.firstName,
			"lastname":i.passenger.lastname,
			"birthDate":i.passenger.birthDate,
			"gender":i.passenger.gender,
			"passportCountry":i.passenger.passportCountry,
			"passportNo":i.passenger.passportNo,
			"issueDate":i.passenger.issueDate,
			"expiryDate":i.passenger.expiryDate
	    },
		"payment": {
			"cardType":i.payment.cardType,
			"cardNo":i.payment.cardNo,
			"expiryDate":i.payment.expiryDate,
			"amount":i.payment.amount,
			"ccv":i.payment.ccv
		},

		
		 "receiptNo":i.receiptNo,
		 "reservationID":i.reservationID,
		 "bookingRefNo":i.bookingRefNo,
		 "outgoingFlight":i.outgoingFlight,
		 "returnFlight":i.returnFlight,
		 "oneWay":i.oneWay
		
	})

	var flightChoosen = DB.collection('flights').find({flightNumber:i.flightNumber}).toArray(function(err,flight){
      
      var j;

      for (j=0;j<flightChoosen.seatmap.length;j++){

      	    if(seatmap[j].reservationID==null){

      		  seatmap[j].reservationID = i.reservationID;
      		  flightChoosen.availableSeats=availableSeats-1;
      	    }
      	    
      	    break;
        }

        if (err) return cb(err);
         
        cb(flight);

	});
}