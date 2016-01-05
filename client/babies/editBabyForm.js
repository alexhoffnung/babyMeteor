Template.editBabyForm.helpers({
  activeBabyDoc: function () {
    return Session.get("activeBaby");
  },
  isActiveBaby: function () {
    return Session.equals("activeBaby", this._id);
  }
});