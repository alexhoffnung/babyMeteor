if (Meteor.isClient) {
  // This code only runs on the client

  Meteor.subscribe("sleeps");

  Template.sleeps.helpers({
    sleeps: function () {
      var currentUserId = Meteor.userId();
      var activeBaby = Session.get("activeBaby");
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Sleeps.find({ $and: [ {checked: {$ne: true}}, { owner:currentUserId }, { babyName:activeBaby } ] },  {sort: {createdAt: -1}});
      } 
      else {
        // Otherwise, return all of the tasks
        return Sleeps.find({ $and: [ { owner:currentUserId }, { babyName:activeBaby } ] }, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      var currentUserId = Meteor.userId();
      return Sleeps.find( { $and: [ {checked: {$ne: true}}, { owner:currentUserId } ] } ).count();
    }
  });


  Template.sleeps.events({
      "submit .add-sleep": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get current user id
      var currentUserId = Meteor.userId();

      // Get value from button element
      var text = event.target.value;

      var activeBaby = Session.get("activeBaby");

      // Insert a meal text into the collection
      Meteor.call("addSleep", text, 0, activeBaby);

      // Clear form
      event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });
}