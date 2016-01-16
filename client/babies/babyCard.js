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
    return Babies.findOne({ 
      $and:[
        {owner: currentUserId},
        {_id:activeBaby._id}
      ]
    });
  },
  images: function () {
      var activeBaby = Babies.findOne({ 
        $and:[
          {owner:Meteor.userId()},
          {activeState:true}
        ]
      });
    return Images.find({'metadata.babyId':activeBaby._id});
  }
});