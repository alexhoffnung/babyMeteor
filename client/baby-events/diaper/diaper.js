 if (Meteor.isClient) {
  Template.diaper.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Diapers.update(this._id, {
          $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Diapers.remove(this._id);
    }
  });
}