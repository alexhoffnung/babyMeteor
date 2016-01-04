/*********************************
*
*   Baby events
*
*********************************/
Babies.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

  Meteor.methods({
    removeAllBabies: function() {
      return Babies.remove({});
    },
    addBaby: function (babyName) {
      // Make sure the user is logged in before inserting a sleep
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Babies.update({ activeState: true }, { $set: { activeState: false } });

      Babies.insert({
        babyName: babyName,
        activeState: true,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    },   
    deleteBaby: function (babyId) {
    var baby = Babies.findOne(babyId);
    if (baby.private && baby.owner !== Meteor.userId()) {
      // If the baby is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
 
      Babies.remove(babyId);
    },
      setCheckedBaby: function (babyId, setChecked) {
      var baby = Babies.findOne(babyId);
      if (baby.private && baby.owner !== Meteor.userId()) {
        // If the baby is private, make sure only the owner can check it off
        throw new Meteor.Error("not-authorized");
      }
    Babies.update(babyId, { $set: { checked: setChecked} });
  },
  setPrivateBaby: function (babyId, setToPrivate) {
      var baby = Babies.findOne(babyId);
 
      // Make sure only the baby owner can make a baby private
      if (baby.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
 
      Babies.update(babyId, { $set: { private: setToPrivate } });
  },
  setActiveBaby: function (babyId, prevBabyId) {
      var baby = Babies.findOne(babyId);
      var prevBaby = Babies.findOne(prevBabyId);
 
      // Make sure only the baby owner can make a baby private
      if (baby.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      Babies.update(prevBabyId, { $set: { activeState: false } });
      Babies.update(babyId, { $set: { activeState: true } });
  }

  });