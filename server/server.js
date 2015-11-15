if (Meteor.isServer) {
 	Meteor.startup(function () {
    	// code to run on server at startup
  });

  // server
	Meteor.publish("userData", function () {
  	if (this.userId) {
    	return Meteor.users.find({_id: this.userId},
                             {fields: {firstName:1, lastName: 1}});
  	} 
  	else {
    	this.ready();
  	}
	});

  Accounts.onCreateUser(function(options, user) {
    //pass the custom fields in the options
//	user.profile['firstName'] = options.firstName;
//  user.profile['lastName'] = options.lastName;
		return user;
	});

    
  Meteor.methods({
    addTask: function (text) {
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
   
      Tasks.insert({
        text: text,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    },
    deleteTask: function (taskId) {
      Tasks.remove(taskId);
    },
    setChecked: function (taskId, setChecked) {
      Tasks.update(taskId, { $set: { checked: setChecked} });
    },
    setPrivate: function (taskId, setToPrivate) {
      var task = Tasks.findOne(taskId);
 
      // Make sure only the task owner can make a task private
      if (task.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
 
      Tasks.update(taskId, { $set: { private: setToPrivate } });
    }
  });


  Meteor.publish("tasks", function () {
    return Tasks.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });

}
