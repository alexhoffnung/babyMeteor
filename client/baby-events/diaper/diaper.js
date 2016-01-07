Template.diaper.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});

Template.diaper.events({
  "click .delete": function () {
    Meteor.call("deleteDiaper", this._id);
  }
});
