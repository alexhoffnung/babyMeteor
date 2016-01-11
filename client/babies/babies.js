Meteor.subscribe("babies");

Meteor.startup(function () {
	var newActiveBaby

	var currentUserId = Meteor.userId();
	var babyCount = Babies.find({owner:currentUserId}).count();

	if (babyCount > 0) {
		var activeBaby = Babies.findOne({$and:[{owner:currentUserId},{activeState:true}]});
		if(! activeBaby) {
			Meteor.call("setRandomBaby");//UPDATE 
		}
	}
});

Template.babies.helpers({
  babies: function () {
    var currentUserId = Meteor.userId();
    return Babies.find({owner: currentUserId});
  }
});