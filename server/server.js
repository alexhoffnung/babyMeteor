if (Meteor.isServer) {
 	Meteor.startup(function () {
    	// code to run on server at startup
  	});

  	// server
	Meteor.publish("userData", function () {
  		if (this.userId) {
    		return Meteor.users.find({_id: this.userId},
                             {fields: {surname: 1}});
  		} 
  		else {
    		this.ready();
  		}
	});

  	Accounts.onCreateUser(function(options, user) {
    	//pass the surname in the options
		user.profile['surname'] = options.surname;
		return user;
	});
}
