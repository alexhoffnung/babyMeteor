Meteor.subscribe("babies");

Template.babyCard.helpers({
  babies: function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({ 
    	$and: [
    		{owner: currentUserId},
    		{activeState:true}
    	]
    });
    return Babies.findOne({ $and: [{owner: currentUserId},{_id:activeBaby._id}]});
  }
});