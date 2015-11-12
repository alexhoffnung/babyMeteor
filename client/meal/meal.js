 if (Meteor.isClient) {
  Template.meal.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meals.update(this._id, {
          $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Meals.remove(this._id);
    }
  });
}