if (Meteor.isClient) {
  // This code only runs on the client
  Template.gotbaby.helpers({
    incompleteCount: function () {
      var currentUserId = Meteor.userId();
      return Meals.find( { $and: [ {checked: {$ne: true}}, { owner:currentUserId } ] } ).count();
    }
  });
}