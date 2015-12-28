// This code only runs on the client

Meteor.subscribe("caretakers");

Template.caretakers.helpers({
  caretakers: function () {
    var currentUserId = Meteor.userId();

    var activeBaby = Session.get("activeBaby");
    
    return Caretakers.find( {$and:[ {owner: currentUserId} , {babyName: activeBaby} ]}, {sort: {createdAt: -1}});
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

    var baby = Babies.findOne({ activeState: true });
console.log(baby._id);
    // Insert a caretaker into the collection
    Meteor.call("addCaretaker", caretakerEmail, baby._id, baby.babyName);

    // Clear form
    event.target.text.value = "";
  }
});
