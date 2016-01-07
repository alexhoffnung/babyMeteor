  Template.gotbabyMeals.helpers({
    "incompleteCount": function () {
      var currentUserId = Meteor.userId();
      var activeBaby = Session.get("activeBaby");
      var today = moment().add(-1,'days');
      return Meals.find( 
        { $and: [ 
          {createdAt: {$gte: today._d}},
          {babyName:activeBaby},
          {owner:currentUserId}
          ] 
        } 
      ).count();
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

      var babyName = Session.get("activeBaby");
console.log(Session.get("activeBaby"));
      // Insert a meal into the collection
      Meteor.call("addMeal", text, ounces, babyName);
    }
  });


  Template.gotbabyDiapers.helpers({
    "incompleteCount": function () {
      var currentUserId = Meteor.userId();
      var activeBaby = Session.get("activeBaby");
      var today = moment().add(-1,'days')
      console.log(today._d)
      console.log(activeBaby)
      return Diapers.find(        
        { $and: [ 
          {createdAt: {$gte: today._d}},
          {babyName:activeBaby},
          {owner:currentUserId}
          ] 
        } 
      ).count();
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

      var babyName = Session.get("activeBaby");

      // Insert a meal into the collection
      Meteor.call("addDiaper", text, mess, babyName);
    }
  });


  Template.gotbabySleeps.helpers({
    "sleepTime": function () {
      var currentUserId = Meteor.userId();
      var activeBaby = Session.get("activeBaby");

      var currentNap = Sleeps.findOne(
        { $and: [ 
          {currentNap:true},
          {babyName:activeBaby},
          {owner:currentUserId}
          ] 
        } 
      );

      if(currentNap) {
        return "fell asleep " + moment(currentNap.createdAt).fromNow();
      }
      else {
        return "awake";
      }
    }
  });

  Template.gotbabySleeps.events({
      "click .new-sleep": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get current user id
      var currentUserId = Meteor.userId();

      // Get value from button element
      var direction = event.target.value;

      var text = "";

      var babyName = Session.get("activeBaby");

      var currentNap = Sleeps.findOne({ $and:[{owner:currentUserId}, {babyName:babyName}, {currentNap:true} ]});

      if(!currentNap) {
        Meteor.call("addSleep", text, direction, babyName);
      }
      else {
        Meteor.call("endSleep", currentNap._id, currentNap.createdAt);
      }
    }
  });