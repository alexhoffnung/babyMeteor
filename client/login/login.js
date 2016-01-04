Template.login.events({
	'click #loginButton' : function(event){
		event.preventDefault();
		let email = $('#inputEmail').val();
		let password = $('#inputPassword').val();
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				$('#errorMessage').text(error.reason);
			} 
			if (Meteor.userId) {
		        Router.go('/');
		    }
		});
	},

	'click #signUpButton' : function(event){
		event.preventDefault();
		let email = $('#inputEmail').val();
		let password = $('#inputPassword').val();
		if(password.length<6){
			$('#errorMessage').text("Password must be at least 6 characters");
		}
		else{
			Accounts.createUser({
	            email: email,
	            password: password,
	            username: email //temp needed for photo upload
	        }, function(error){
	        	if (error) {
	            	$('#errorMessage').text(error.reason);
	        	}
	        	if (Meteor.userId) {
		        	Router.go('/');
		    	}
	        });
		}
	}
});