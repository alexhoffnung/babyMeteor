 if (Meteor.isClient) {
  Template.meal.helpers({
    isOwner: function () {
      return this.owner === Meteor.userId();
    }
  });
 

  Template.meal.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("setCheckedMeal", this._id, ! this.checked);

    },
    "click .delete": function () {
        Meteor.call("deleteMeal", this._id);
    },
    "click .toggle-private": function () {
      Meteor.call("setPrivateMeal", this._id, ! this.private);
    }
  });
}