Template.baby.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});


Template.baby.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Meteor.call("setCheckedBaby", this._id, ! this.checked);

  },
  "click .delete": function () {
      Meteor.call("deleteBaby", this._id);
  },
    "click .activeBaby": function () {
  /*    if(this.activeState === "inactive")
      { */
        activeBaby = this.babyName;
    /*  } */
      Session.set("activeBaby", activeBaby);
      console.log(activeBaby);
      Meteor.call("setActiveBaby", this._id, !this.activeState);
  },
  "click .toggle-private": function () {
    Meteor.call("setPrivateBaby", this._id, ! this.private);
  }
});
