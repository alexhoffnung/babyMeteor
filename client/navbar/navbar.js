Template.navbar.onRendered(function () {
    var currentUserId = Meteor.userId();
 
    var activeBaby = Babies.findOne({ $and:[{owner:currentUserId}, {activeState:true}]});
    if(activeBaby) {
		console.log("activeBaby.babyName: " + activeBaby.babyName)
    	Session.set("activeBaby", activeBaby.babyName);
    }
    else {
    	// prompt user to activate a baby
    }
});