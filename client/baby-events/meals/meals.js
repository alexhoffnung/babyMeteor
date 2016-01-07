// This code only runs on the client

Meteor.subscribe("meals");

Template.meals.helpers({
  meals: function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Session.get("activeBaby");
    return Meals.find({ $and: [ { owner:currentUserId }, { babyName:activeBaby }] }, {sort: {createdAt: -1}});
  },
  incompleteCount: function () {
      var currentUserId = Meteor.userId();
      var activeBaby = Session.get("activeBaby");
      var today = moment().add(-1,'days');
      return Meals.find( 
        { $and: [ 
          {createdAt: {$gte: today._d}},
          {babyName:activeBaby},
          {owner:currentUserId}
          ] 
        } 
      ).count();
  }
});

Template.meals.events({
    "submit .add-meal": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get current user id
    var currentUserId = Meteor.userId();

    // Get value from button element
    var text = event.target.text.value;

    var activeBaby = Session.get("activeBaby");

    Meteor.call("addMeal", text, 0, activeBaby);

    // Clear form
    event.target.text.value = "";
  },
  "change .hide-completed input": function (event) {
    Session.set("hideCompleted", event.target.checked);
  }
});
