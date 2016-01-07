Template.baby.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});


Template.baby.events({
  "click .delete": function () {
      Meteor.call("deleteBaby", this._id);
  },
  "click .activeBaby": function () {
      if(this.activeState === true) {
      }
      else {
        var currentUserId = Meteor.userId();
        var baby = Babies.findOne({$and:[{owner:currentUserId},{activeState:true}]});
        var prevBabyId = baby._id;

        Session.set("activeBaby", this._id);
        Meteor.call("setActiveBaby", this._id, prevBabyId);
      }
  }
});
