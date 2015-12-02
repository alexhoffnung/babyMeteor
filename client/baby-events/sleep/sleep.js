 if (Meteor.isClient) {

  Template.sleep.helpers({
    isOwner: function () {
      return this.owner === Meteor.userId();
    }
  });

  Template.sleep.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("setCheckedSleep", this._id, ! this.checked);
    },
    "click .delete": function () {
        Meteor.call("deleteSleep", this._id);
    },
    "click .toggle-private": function () {
      Meteor.call("setPrivateSleep", this._id, ! this.private);
    }
  });
}