if (Meteor.isClient) {
  // This code only runs on the client

  Meteor.subscribe("meals");

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
      "submit .add-meal": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get current user id
      var currentUserId = Meteor.userId();

      // Get value from button element
      var text = event.target.text.value;
 
      // Insert a meal text into the collection
      Meteor.call("addMeal", text, 0);

      // Clear form
      event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });
}