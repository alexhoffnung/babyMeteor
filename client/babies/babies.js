Meteor.subscribe("babies");

Meteor.startup(function () {
    var currentUserId = Meteor.userId();
    var baby = Babies.findOne({ $and:[{activeState:true},{owner:currentUserId}]});
    Session.set("activeBaby",baby._id);
});

Template.babies.helpers({
  babies: function () {
    var currentUserId = Meteor.userId();
    return Babies.find({owner: currentUserId});
  }
});