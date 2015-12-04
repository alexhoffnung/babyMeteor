// This code only runs on the client

Meteor.subscribe("babies");

Template.babies.helpers({
  babies: function () {
    var currentUserId = Meteor.userId();
    console.log(Babies.find({owner: currentUserId}, {sort: {createdAt: -1}}));
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

    var activeState = true;

    // Insert a meal text into the collection
    Meteor.call("addBaby", babyName, activeState);

    // Clear form
    event.target.text.value = "";
  }
});
