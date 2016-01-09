Meteor.subscribe("sleeps");

Template.sleeps.helpers({
  sleeps: function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({
      $and: [
        { owner:currentUserId },
        { activeState:true }
      ]
    });
    return Sleeps.find({ 
      $and: [ 
        { owner:currentUserId }, 
        { babyId:activeBaby._id } ] }, 
        {sort: {createdAt: -1}});
  },
  incompleteCount: function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({
      $and: [
        { owner:currentUserId },
        { activeState:true }
      ]
    });
    var today = moment().add(-1,'days');
    return Sleeps.find( 
      { $and: [ 
        {createdAt: {$gte: today._d}},
        {babyId:activeBaby._id},
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

    // Get value from button element
    var text = event.target.value;

    Meteor.call("addSleep", text);

    // Clear form
    event.target.text.value = "";
  }
});