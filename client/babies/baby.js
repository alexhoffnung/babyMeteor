Template.baby.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});


Template.baby.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Meteor.call("setCheckedBaby", this._id, ! this.checked);

  },
  "click .delete": function () {
      Meteor.call("deleteBaby", this._id);
  },
  "click .activeBaby": function () {
      if(this.activeState === true)
      {
        console.log("spank hank");
      }
      else
      {
        var babyArray = Babies.find({activeState:true});
        var prevBabyId = 0;
        babyArray.forEach(function (baby) {
          prevBabyId = baby._id;
        });

        Session.set("activeBaby", this.babyName);
        Meteor.call("setActiveBaby", this._id, prevBabyId);
      }
  },
  "click .toggle-private": function () {
    Meteor.call("setPrivateBaby", this._id, ! this.private);
  }
});
