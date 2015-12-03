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
  "click .toggle-private": function () {
    Meteor.call("setPrivateBaby", this._id, ! this.private);
  }
});
