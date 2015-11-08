if (Meteor.isClient) {
  // This code only runs on the client	
	Template.user.helpers({
	  firstName: function() {
	    return Meteor.userId();
	  },
	  lastName: function() {
	    return Meteor.users.find();
	  }
	});
}