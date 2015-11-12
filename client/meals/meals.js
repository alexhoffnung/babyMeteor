if (Meteor.isClient) {
  // This code only runs on the client
  Template.meals.helpers({
    meals: function () {
      var currentUserId = Meteor.userId();
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Meals.find({ $and: [ {checked: {$ne: true}}, { owner:currentUserId } ] },  {sort: {createdAt: -1}});
      } 
      else {
        // Otherwise, return all of the tasks
        return Meals.find({owner: currentUserId}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      var currentUserId = Meteor.userId();
      return Meals.find( { $and: [ {checked: {$ne: true}}, { owner:currentUserId } ] } ).count();
    }
  });


  Template.meals.events({
    /*
        "click .new-meal": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
console.log("hello");
      // Get current user id
      var currentUserId = Meteor.userId();
 console.log(event.target);
      // Get value from button element
      var ounces = event.target.value;
 
      // Insert a task into the collection
      Meals.insert({
        ounces: ounces,                 //# of ounces
        createdAt: new Date(),          // current time
        owner: currentUserId,           // _id of logged in user
        createdBy: Meteor.user().username  // username of logged in user
      });
 
    },*/
      "submit .new-meal": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get current user id
      var currentUserId = Meteor.userId();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a task into the collection
      Meals.insert({
        text: text,
        createdAt: new Date(),            // current time
        owner: currentUserId,           // _id of logged in user
        createdBy: Meteor.user().username  // username of logged in user
      });
 
      // Clear form
      event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
      console.log(event.target.checked);
      Session.set("hideCompleted", event.target.checked);
      var hideCompletedValue = Session.get("hideCompleted");
      console.log(hideCompletedValue);
    }
  });
}