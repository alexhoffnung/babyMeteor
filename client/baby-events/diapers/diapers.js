Meteor.subscribe("diapers");

Template.diapers.helpers({
  diapers: function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Session.get("activeBaby");
    return Diapers.find({ $and: [ { owner:currentUserId }, {babyName:activeBaby} ] }, {sort: {createdAt: -1}});
  },
  incompleteCount: function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Session.get("activeBaby");
    var today = moment().add(-1,'days')
    return Diapers.find(        
      { $and: [ 
        {createdAt: {$gte: today._d}},
        {_id:activeBaby},
        {owner:currentUserId}
        ] 
      } 
    ).count();
  }
});


Template.diapers.events({
    "submit .add-diaper": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    var currentUserId = Meteor.userId();
    // Get value from form element
    var text = event.target.value;

    var activeBaby = Session.get("activeBaby");

    Meteor.call("addDiaper", text, "", activeBaby);

    event.target.text.value = "";
  },
  "change .hide-completed input": function (event) {
    Session.set("hideCompleted", event.target.checked);
  }
});