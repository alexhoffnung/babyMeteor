Template.meal.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  },
  isSolid: function () {
  	console.log(this.ounces > 0)
    return this.ounces > 0;
  }
});

Template.meal.events({
  "click .delete": function () {
      Meteor.call("deleteMeal", this._id);
  }
});
