 if (Meteor.isClient) {
  Template.task.helpers({
    isOwner: function () {
      return this.owner === Meteor.userId();
    }
  });


  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("setCheckedTask", this._id, ! this.checked);
    },
    "click .delete": function () {
      Meteor.call("deleteTask", this._id);
    },
    "click .toggle-private": function () {
      Meteor.call("setPrivateTask", this._id, ! this.private);
    }
  });
}