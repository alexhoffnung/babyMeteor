if (Meteor.isClient) {
  // This code only runs on the client
  Template.gotbabyMeals.helpers({
    "incompleteCount": function () {
      var currentUserId = Meteor.userId();
      return Meals.find( { $and: [ {checked: {$ne: true}}, { owner:currentUserId } ] } ).count();
    }
  });

  Template.gotbabyMeals.events({
      "click .new-meal": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get current user id
      var currentUserId = Meteor.userId();

      // Get value from button element
      var ounces = event.target.value;

      var text = "";

      // Insert a meal into the collection
      Meteor.call("addMeal", text, ounces);
    }
  });


  Template.gotbabyDiapers.helpers({
    "incompleteCount": function () {
      var currentUserId = Meteor.userId();
      return Diapers.find( { $and: [ {checked: {$ne: true}}, { owner:currentUserId } ] } ).count();
    }
  });

  Template.gotbabyDiapers.events({
      "click .new-diaper": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get current user id
      var currentUserId = Meteor.userId();

      // Get value from button element
      var mess = event.target.value;

      var text = "";

      // Insert a meal into the collection
      Meteor.call("addDiaper", text, mess);
    }
  });


  Template.gotbabySleeps.helpers({
    "incompleteCount": function () {
      var currentUserId = Meteor.userId();
      return Sleeps.find( { $and: [ {checked: {$ne: true}}, { owner:currentUserId } ] } ).count();
    }
  });

  Template.gotbabySleeps.events({
      "click .new-sleep": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
console.log("fdv");
      // Get current user id
      var currentUserId = Meteor.userId();

      // Get value from button element
      var direction = event.target.value;

      var text = "";

      // Insert a meal into the collection
      Meteor.call("addSleep", text, direction);
    }
  });


}