Meteor.subscribe("babies");

Meteor.startup(function () {

	var currentUserId = Meteor.userId();
	var babyCount = Babies.find({owner:currentUserId}).count();
console.log("random baby 2")
	if (babyCount > 0) {
		var activeBaby = Babies.findOne({$and:[{owner:currentUserId},{activeState:true}]});
		console.log(activeBaby)
		if(! activeBaby) {
			console.log("random baby")
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