// This code only runs on the client

Meteor.subscribe("caretakers");

Template.caretakers.helpers({
  caretakers: function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({
      $and: [
        { owner:currentUserId },
        { activeState:true }
      ]
    });
    
    return Caretakers.find({
        $and:[ 
            {owner: currentUserId}, 
            {babyId: activeBaby._id}
        ]
    }, 
    {
        sort: {createdAt: -1}
    });
  }
});


Template.caretakers.events({
    "submit .add-caretaker": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from button element
    var caretakerEmail = event.target.text.value;

    Meteor.call("addCaretaker", caretakerEmail);

    // Clear form
    event.target.text.value = "";
  }
});
