if (Meteor.isClient) {
	// This code only runs on the client
	Meteor.subscribe("userData");

	Template.user.helpers({
	  firstName: function() {
	    return Meteor.userId();
	  },
	  lastName: function() {
	    return Meteor.user().profile.surname;
	  }
	});


	Template.user.events({
    "submit .update-user-surname": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get current user id
      var currentUserId = Meteor.userId();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a task into the collection
      Meteor.users.update({_id:Meteor.userId()}, { $set: {'profile.surname':text} });
      console.log(Meteor.users.find().fetch());
 
      // Clear form
      event.target.text.value = "";
    }
  });
}