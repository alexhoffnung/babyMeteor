if (Meteor.isClient) {
	// This code only runs on the client
	Meteor.subscribe("userData");

	Template.user.helpers({
	  userId: function() {
	    return Meteor.userId();
	  },
	  username: function() {
	    return Meteor.user().username;
	  },
	  firstName: function() {
	    return Meteor.user().profile.firstName;
	  },
	  lastName: function() {
	    return Meteor.user().profile.lastName;
	  }
	});


	Template.user.events({
    "submit .update-user-lastname": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var lastNameText = event.target.lastNameText.value;
      // Update current user last name field
      Meteor.users.update({_id:Meteor.userId()}, { $set: {'profile.lastName':lastNameText} });
 
      // Clear form
      event.target.lastNameText.value = "";
    },
    "submit .update-user-firstname": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var firstNameText = event.target.firstNameText.value;
      // Update current user firstname field
      Meteor.users.update({_id:Meteor.userId()}, { $set: {'profile.firstName':firstNameText} });
 
      // Clear form
      event.target.firstNameText.value = "";
    }
  });
}