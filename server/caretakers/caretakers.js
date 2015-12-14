/*********************************
*
*   Caretaker events
*
*********************************/

  Meteor.methods({
    addCaretaker: function (caretakerEmail) {
      // Make sure the user is logged in before inserting a sleep
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Caretakers.insert({
        caretakerEmail: caretakerEmail,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    },   
    deleteCaretaker: function (caretakerId) {
    var caretaker = Caretakers.findOne(caretakerId);
    if (caretaker.owner !== Meteor.userId()) {
      // If the baby is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
 
     Caretakers.remove(caretakerId);
    }
  });