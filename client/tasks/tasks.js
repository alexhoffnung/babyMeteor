if (Meteor.isClient) {
  // This code only runs on the client
  Template.tasks.helpers({
    tasks: function () {
      var currentUserId = Meteor.userId();
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Tasks.find({checked: {$ne: true}}, {owner: currentUserId},  {sort: {createdAt: -1}});
      } 
      else {
        // Otherwise, return all of the tasks
        return Tasks.find({owner: currentUserId}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });


  Template.tasks.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get current user id
      var currentUserId = Meteor.userId();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date(),            // current time
        owner: currentUserId,           // _id of logged in user
        createdBy: Meteor.user().username  // username of logged in user
      });
 
      // Clear form
      event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });
}