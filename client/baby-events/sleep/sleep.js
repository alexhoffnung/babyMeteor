Template.sleep.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});

Template.sleep.events({
  "click .delete": function () {
      Meteor.call("deleteSleep", this._id);
  }
});