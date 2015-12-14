Template.caretaker.events({
  "click .delete": function () {
      Meteor.call("deleteCaretaker", this._id);
  }
});