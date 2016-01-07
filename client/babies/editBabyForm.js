Template.editBabyForm.helpers({
  activeBabyDoc: function () {
  	console.log("PETER PETER")
  	var currentUserId = Meteor.userId();
    return Babies.findOne({ $and:[{owner:currentUserId},{_id:Session.get("activeBaby")}]});
  },
  isActiveBaby: function () {
    return Session.equals("activeBaby", this._id);
  }
});