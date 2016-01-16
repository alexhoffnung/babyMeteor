Template.gotbabyMeals.helpers({
  "incompleteCount": function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({
      $and: [
        {owner:currentUserId},
        {activeState:true}
      ]
    });
    var today = moment().add(-1,'days');
    return Meals.find( 
      { $and: [ 
        {createdAt: {$gte: today._d}},
        {babyId:activeBaby._id},
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
    var activeBaby = Babies.findOne({
      $and: [
        {owner:currentUserId},
        {activeState:true}
      ]
    });
    var today = moment().add(-1,'days')

    return Diapers.find(        
      { $and: [ 
        {createdAt: {$gte: today._d}},
        {babyId:activeBaby._id},
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

    // Get value from button element
    var mess = event.target.value;

    var text = "";

    Meteor.call("addDiaper", text, mess);
  }
});


Template.gotbabySleeps.helpers({
  "sleepTime": function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({
      $and: [
        {owner:currentUserId},
        {activeState:true}
      ]
    });

    var currentNap = Sleeps.findOne(
      { $and: [ 
        {currentNap:true},
        {babyId:activeBaby._id},
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
    event.preventDefault();
    var currentUserId = Meteor.userId();

    var text = "";

    var activeBaby = Babies.findOne({
      $and: [
        {owner:currentUserId},
        {activeState:true}
      ]
    });

    var currentNap = Sleeps.findOne({ 
      $and:[
        {owner:currentUserId}, 
        {babyId:activeBaby._id}, 
        {currentNap:true} 
      ]
    });

    if(!currentNap) {
      Meteor.call("addSleep", text);
    }
    else {
      Meteor.call("endSleep", currentNap._id, currentNap.createdAt);
    }
  }
});