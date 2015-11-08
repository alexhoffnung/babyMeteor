if (Meteor.isClient) {
	// This code only runs on the client
	Meteor.subscribe("currentUserData");

	Template.user.helpers({
	  firstName: function() {
	    return Meteor.userId();
	  },
	  lastName: function() {
	  	var tempName = Meteor.users.find( { owner:Meteor.userId() } );
	  	console.log(tempName);
	    return Meteor.users.find( {_id:Meteor.userId() } ).profile.surname;
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
console.log(text);
var tempName = Meteor.users.find( { _id:Meteor.userId() } );
console.log(tempName);
 
      // Clear form
      event.target.text.value = "";
    }
  });
}