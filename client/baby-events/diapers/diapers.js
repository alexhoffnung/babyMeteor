Meteor.subscribe("diapers");

Template.diapers.helpers({
  diapers: function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({ $and: [ { owner:currentUserId }, {activeState:true} ] });
    return Diapers.find({ $and: [ { owner:currentUserId }, {babyId:activeBaby._id} ] }, {sort: {createdAt: -1}});
  },
  incompleteCount: function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({ $and: [ { owner:currentUserId }, {activeState:true} ] });
    var today = moment().add(-1,'days')
    return Diapers.find(        
      { $and: [ 
        {createdAt: {$gte: today._d}},
        {babyId:activeBaby._id},
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

    Meteor.call("addDiaper", text, "");

    event.target.text.value = "";
  }
});