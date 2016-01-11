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
      if(this.activeState === false) {
        Meteor.call("setActiveBaby", this._id);
    }
  }
});
