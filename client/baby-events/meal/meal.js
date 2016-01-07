Template.meal.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});

Template.meal.events({
  "click .delete": function () {
      Meteor.call("deleteMeal", this._id);
  }
});
