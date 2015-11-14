 if (Meteor.isClient) {
  Template.sleep.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Sleeps.update(this._id, {
          $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Sleeps.remove(this._id);
    }
  });
}