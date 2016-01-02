// This code only runs on the client

Meteor.subscribe("babies");

Meteor.startup(function () {
    var currentUserId = Meteor.userId();
    var baby = Babies.findOne({owner:currentUserId});
    Session.set("activeBaby",baby.babyName);
});

Template.babies.helpers({
  babies: function () {
    var currentUserId = Meteor.userId();
    
    return Babies.find({owner: currentUserId}, {sort: {createdAt: -1}});
  }
});


Template.babies.events({
    "submit .add-baby": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get current user id
    var currentUserId = Meteor.userId();

    // Get value from button element
    var babyName = event.target.text.value;

    Session.set("activeBaby",babyName);
    console.log(Session.get("activeBaby"));
    // Insert a meal text into the collection
    Meteor.call("addBaby", babyName);

    // Clear form
    event.target.text.value = "";
  }
});
