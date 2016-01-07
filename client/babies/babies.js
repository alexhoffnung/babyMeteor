Meteor.subscribe("babies");

Meteor.startup(function () {
    var currentUserId = Meteor.userId();
    var baby = Babies.findOne({ $and:[{activeState:true},{owner:currentUserId}]});
    console.log(baby)
    Session.set("activeBaby",baby.babyName);
});

Template.babies.helpers({
  babies: function () {
    var currentUserId = Meteor.userId();
    return Babies.find({owner: currentUserId});
  }
});