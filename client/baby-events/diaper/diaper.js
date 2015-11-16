 if (Meteor.isClient) {

  Template.diaper.helpers({
    isOwner: function () {
      return this.owner === Meteor.userId();
    }
  });

  Template.diaper.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("setCheckedDiaper", this._id, ! this.checked);
    },
    "click .delete": function () {
      Meteor.call("deleteDiaper", this._id);
    },
    "click .toggle-private": function () {
      Meteor.call("setPrivateDiaper", this._id, ! this.private);
    }
  });
}