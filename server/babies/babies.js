Babies.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

  Meteor.methods({
    updateActiveState: function() {
      Babies.update({ activeState: true }, { $set: { activeState: false } });
    },
    deleteBaby: function (babyId) {
    var baby = Babies.findOne(babyId);
    var currentUserId = Meteor.userId();
    if (baby.owner !== currentUserId) {
      throw new Meteor.Error("not-authorized");
    }
 
    Babies.remove(babyId);
    //Clean collections
    Meals.remove({babyId:babyId});
    Diapers.remove({babyId:babyId});
    Sleeps.remove({babyId:babyId});

    var baby = Babies.findOne({ 
      $and:[
        {activeState:true},
        {owner:currentUserId}
      ]
    });
    if(!baby){
      baby = Babies.findOne({owner:currentUserId});
      if(baby){
        Babies.update(baby._id,{$set:{activeState:true}});
      }
      else{
        // ADD BABY!!!
      }
    }
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