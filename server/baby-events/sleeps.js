Meteor.methods({
  addSleep: function (text) {
  if (! Meteor.userId()) {
    throw new Meteor.Error("not-authorized");
  }

  var activeBaby = Babies.findOne({
      $and: [
        { owner:Meteor.userId() },
        { activeState:true }
      ]
    });

  Sleeps.insert({
    text: text,
    babyId: activeBaby._id,
    currentNap: true,
    createdAt: new Date(),
    createdAtStart: moment().startOf('day').toDate(),
    endSleep: new Date(),
    napLength: "in progress...zzz...",
    owner: Meteor.userId(),
    username: Meteor.user().username
  });
},
endSleep: function (currentNapId, currentNapStartTime) {
  if (! Meteor.userId()) {
    throw new Meteor.Error("not-authorized");
  }

  var endTime = new Date();
  var napLength = moment.utc(moment(endTime,"DD/MM/YYYY HH:mm:ss").diff(moment(currentNapStartTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");

  Sleeps.update({ _id: currentNapId }, { $set: { currentNap: false, endSleep:endTime, napLength:napLength} });
},
  deleteSleep: function (sleepId) {
  var sleep = Sleeps.findOne(sleepId);
  if (sleep.owner !== Meteor.userId()) {
    throw new Meteor.Error("not-authorized");
  }

    Sleeps.remove(sleepId);
  }
});