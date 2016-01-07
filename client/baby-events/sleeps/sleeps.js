Meteor.subscribe("sleeps");

Template.sleeps.helpers({
  sleeps: function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Session.get("activeBaby");
    return Sleeps.find({ $and: [ { owner:currentUserId }, { babyId:activeBaby } ] }, {sort: {createdAt: -1}});
  },
  incompleteCount: function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Session.get("activeBaby");
    var today = moment().add(-1,'days');
    return Sleeps.find( 
      { $and: [ 
        {createdAt: {$gte: today._d}},
        {babyId:activeBaby},
        {owner:currentUserId}
        ] 
      } 
    ).count();
  }
});


Template.sleeps.events({
    "submit .add-sleep": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get current user id
    var currentUserId = Meteor.userId();

    // Get value from button element
    var text = event.target.value;

    var activeBaby = Session.get("activeBaby");

    // Insert a meal text into the collection
    Meteor.call("addSleep", text, 0, activeBaby);

    // Clear form
    event.target.text.value = "";
  }
});