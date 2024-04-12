jQuery( function ( $ ) {
    var style = {
        css: { 
            border: 'none', 
            padding: '15px', 
            backgroundColor: '#000', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: .5, 
            color: '#fff' 
        },

    }

    $.blockUI({ 
        ...style,
        message: '<p> Please wait...</p>' 
    }); 

    setTimeout($.unblockUI, 1000);
	// $.blockUI({message: '<p> Please wait...</p>'});
	let payment_made = false;
	const redirectPost = function (location, args) {
		let form = "";
		$.each(args, function (key, value) {
			// value = value.split('"').join('\"')
			form += '<input type="hidden" name="' + key + '" value="' + value + '">';
		});
		$('<form action="' + location + '" method="POST">' + form + "</form>")
			.appendTo($(document.body))
			.submit();
	};

	const processData = () => {
		return {
			key: budpay_args.public_key,
            email: budpay_args.email,
			amount: budpay_args.amount,
            first_name: budpay_args.first_name,
            last_name: budpay_args.last_name,
			reference: budpay_args.reference,
			currency: budpay_args.currency,
            callback: function (response) {
				var tr = response.reference;
                console.log(response);
				if ( 'successful' === response.status ) {
					payment_made = true;
					$.blockUI({
                        ...style,
                        message: '<p> confirming transaction ...</p>'
                    });
					redirectPost(flw_payment_args.redirect_url + "?reference=" + tr, response);
				}
				this.close(); // close modal
			},
			onclose: function () {
				$.unblockUI();
				if (payment_made) {
					$.blockUI({ 
                        ...style, 
                        message: '<p> confirming transaction ...</p>'
                    });
					redirectPost(flw_payment_args.redirect_url + "?reference=" + flw_payment_args.reference, {});
				} else {
					$.blockUI({
                        ...style,
                        message: '<p> Canceling Payment ...</p>'
                    });
					window.location.href = flw_payment_args.cancel_url;
				}
			}
		}
	}
	let payload = processData();
	let x = window.BudPayCheckout(payload);
} );