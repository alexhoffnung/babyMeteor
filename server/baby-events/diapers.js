Meteor.methods({
  addDiaper: function (text, mess, activeBaby) {

    // Make sure the user is logged in before inserting a diaper
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Diapers.insert({
      text: text,
      mess: mess,
      babyId: activeBaby,
      createdAt: new Date(),
      createdAtStart: moment().startOf('day').toDate(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteDiaper: function (diaperId) {
    var diaper = Diapers.findOne(diaperId);
    if (diaper.owner !== Meteor.userId()) {
      // If the diaper is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
 
    Diapers.remove(diaperId);
  }
});

