if (Meteor.isClient) {
  // This code only runs on the client
  Template.gotbaby.helpers({
    incompleteCount: function () {
      var currentUserId = Meteor.userId();
      return Meals.find( { $and: [ {checked: {$ne: true}}, { owner:currentUserId } ] } ).count();
    }
  });

  Template.gotbaby.events({
      "click": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get current user id
      var currentUserId = Meteor.userId();
 console.log(event.target);
      // Get value from button element
      var ounces = event.target.value;
 console.log(ounces);
      // Insert a task into the collection
      Meals.insert({
        ounces: ounces,                 //# of ounces
        createdAt: new Date(),          // current time
        owner: currentUserId,           // _id of logged in user
        createdBy: Meteor.user().username  // username of logged in user
      });
 
    }
  });
}