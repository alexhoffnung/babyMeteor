Meteor.subscribe("meals");

Template.meals.helpers({
  meals: function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({
        $and: [
          {owner:currentUserId},
          {activeState:true}
        ]
    });
    var today = moment().add(-1,'days')
    return Meals.find( 
      { $and: [ 
        {createdAt: {$gte: today._d}},
        {babyId:activeBaby._id},
        {owner:currentUserId}
        ] 
      },
      {
        sort: {createdAt: -1}
      }
    );
  },
  incompleteCount: function () {
      var currentUserId = Meteor.userId();
      var activeBaby = Babies.findOne({
        $and: [
          {owner:currentUserId},
          {activeState:true}
        ]
      });
      var today = moment().add(-1,'days');
      return Meals.find( 
        { $and: [ 
          {createdAt: {$gte: today._d}},
          {babyId:activeBaby._id},
          {owner:currentUserId}
          ] 
        } 
      ).count();
  }
});

Template.meals.events({
    "submit .add-meal": function (event) {
    event.preventDefault();
    var text = event.target.text.value;
    Meteor.call("addMeal", text, 0);
    event.target.text.value = "";
  }
});
