Template.editBabyForm.helpers({
  activeBabyDoc: function () {
  	var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({ 
    	$and:[
    		{owner: currentUserId},
    		{activeState:true}
    	]
    });  
    console.log(activeBaby._id);	
    return Babies.findOne({ 
    	$and:[
    		{owner:currentUserId},
    		{_id:activeBaby._id}
    	]
    });
  }
});