Template.gotbabyMeals.helpers({
  "incompleteCount": function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({
      $and: [
        {owner:currentUserId},
        {activeState:true}
      ]
    });
    console.log(activeBaby)
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
    event.preventDefault();
    var ounces = event.target.value;
    Meteor.call("addMeal", "", ounces);
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
    event.preventDefault();
    var mess = event.target.value;
    Meteor.call("addDiaper", "", mess);
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
      Meteor.call("addSleep", "");
    }
    else {
      Meteor.call("endSleep", currentNap._id, currentNap.createdAt);
    }
  }
});