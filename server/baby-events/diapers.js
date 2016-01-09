Meteor.methods({
  addDiaper: function (text, mess) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var activeBaby = Babies.findOne({ 
      $and: [ 
        { owner:Meteor.userId() }, 
        { activeState:true } 
      ] 
    });
 
    Diapers.insert({
      text: text,
      mess: mess,
      babyId: activeBaby._id,
      createdAt: new Date(),
      createdAtStart: moment().startOf('day').toDate(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteDiaper: function (diaperId) {
    var diaper = Diapers.findOne(diaperId);
    if (diaper.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Diapers.remove(diaperId);
  }
});

