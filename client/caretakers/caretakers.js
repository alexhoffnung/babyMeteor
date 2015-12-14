// This code only runs on the client

Meteor.subscribe("caretakers");

Template.caretakers.helpers({
  caretakers: function () {
    var currentUserId = Meteor.userId();
    
    return Caretakers.find({owner: currentUserId}, {sort: {createdAt: -1}});
  }
});


Template.caretakers.events({
    "submit .add-caretaker": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get current user id
    var currentUserId = Meteor.userId();

    // Get value from button element
    var caretakerEmail = event.target.text.value;

    // Insert a caretaker into the collection
    Meteor.call("addCaretaker", caretakerEmail);

    // Clear form
    event.target.text.value = "";
  }
});
