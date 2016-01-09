Meteor.subscribe("babies");

Meteor.startup(function () {

});

Template.babies.helpers({
  babies: function () {
    var currentUserId = Meteor.userId();
    return Babies.find({owner: currentUserId});
  }
});