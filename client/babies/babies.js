// This code only runs on the client

Meteor.subscribe("babies");

Meteor.startup(function () {
    var currentUserId = Meteor.userId();
    var baby = Babies.findOne({owner:currentUserId});
 //   Session.set("activeBaby",baby.babyName);

});

Template.babies.helpers({
  babies: function () {
    var currentUserId = Meteor.userId();
    
    return Babies.find({owner: currentUserId}, {sort: {createdAt: -1}});
  }
});


Template.babies.events({

});
