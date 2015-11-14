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
console.log("ppp");
      // Get current user id
      var currentUserId = Meteor.userId();

      // Get value from button element
      var ounces = event.target.value;

      // Insert a task into the collection
      Meals.insert({
        ounces: ounces,                 //# of ounces
        createdAt: new Date(),          // current time
        owner: currentUserId,           // _id of logged in user
        createdBy: Meteor.user().username  // username of logged in user
      });
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

      // Insert a task into the collection
      Diapers.insert({
        mess: mess,                 //type of mess
        createdAt: new Date(),          // current time
        owner: currentUserId,           // _id of logged in user
        createdBy: Meteor.user().username  // username of logged in user
      });
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

      // Get current user id
      var currentUserId = Meteor.userId();

      // Insert a task into the collection
      Sleeps.insert({
        createdAt: new Date(),          // current time
        owner: currentUserId,           // _id of logged in user
        createdBy: Meteor.user().username  // username of logged in user
      });
    }
  });


}