Meteor.subscribe("babies");

Template.babyCard.helpers({
  babies: function () {
    var currentUserId = Meteor.userId();
    let activeBaby = Session.get("activeBaby");
    return Babies.findOne({ $and: [{owner: currentUserId},{_id:activeBaby}]});
  }
});