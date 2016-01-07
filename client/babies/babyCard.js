Meteor.subscribe("babies");

Template.babyCard.helpers({
  babies: function () {
    var currentUserId = Meteor.userId();
    let activeBaby = Session.get("activeBaby");
    console.log(activeBaby)
    console.log(currentUserId)
    return Babies.findOne({ $and: [{owner: currentUserId},{babyName:activeBaby}]});
  }
});