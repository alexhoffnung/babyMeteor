Meteor.methods({
  addCaretaker: function (caretakerEmail) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var activeBaby = Babies.findOne({
      $and: [
        { owner:Meteor.userId() },
        { activeState:true }
      ]
    });

    Caretakers.insert({
      caretakerEmail: caretakerEmail,
      babyId: activeBaby._id,
      babyName: activeBaby.babyName,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },   
  deleteCaretaker: function (caretakerId) {
  var caretaker = Caretakers.findOne(caretakerId);
  if (caretaker.owner !== Meteor.userId()) {
    throw new Meteor.Error("not-authorized");
  }

   Caretakers.remove(caretakerId);
  }
});