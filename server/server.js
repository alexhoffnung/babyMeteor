if (Meteor.isServer) {
 	Meteor.startup(function () {
    	// code to run on server at startup
  	});

  	Accounts.onCreateUser(function(options, user) {
    //pass the surname in the options

    user.profile['surname'] = options.surname;

    return user;
	});
}
