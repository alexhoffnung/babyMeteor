if (Meteor.isClient) {
  // This code only runs on the client

  Meteor.subscribe("diapers");

  Template.diapers.helpers({
    diapers: function () {
      var currentUserId = Meteor.userId();
      var activeBaby = Session.get("activeBaby");
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Diapers.find({ $and: [ {checked: {$ne: true}}, { owner:currentUserId }, {babyName:activeBaby} ] },  {sort: {createdAt: -1}});
      } 
      else {
        // Otherwise, return all of the tasks
        return Diapers.find({ $and: [ { owner:currentUserId }, {babyName:activeBaby} ] }, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      var currentUserId = Meteor.userId();
      return Diapers.find( { $and: [ {checked: {$ne: true}}, { owner:currentUserId } ] } ).count();
    }
  });


  Template.diapers.events({
      "submit .add-diaper": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get current user id
      var currentUserId = Meteor.userId();
 
      // Get value from form element
      var text = event.target.value;

      var activeBaby = Session.get("activeBaby");
 
      // Insert a diaper text into the collection
      Meteor.call("addDiaper", text, "", activeBaby);

      // Clear form
      event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });
}