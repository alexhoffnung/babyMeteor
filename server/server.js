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

/*********************************
*
*    Task list methods
*
*********************************/

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
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
 
      Tasks.remove(taskId);
    },
    setCheckedTask: function (taskId, setChecked) {
      var task = Tasks.findOne(taskId);
      if (task.private && task.owner !== Meteor.userId()) {
        // If the task is private, make sure only the owner can check it off
        throw new Meteor.Error("not-authorized");
      }
 
      Tasks.update(taskId, { $set: { checked: setChecked} });
    },
    setPrivateTask: function (taskId, setToPrivate) {
      var task = Tasks.findOne(taskId);
 
      // Make sure only the task owner can make a task private
      if (task.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
 
      Tasks.update(taskId, { $set: { private: setToPrivate } });
    }
  });


/*********************************
*
*    Meal list methods
*
*********************************/

  Meteor.methods({

    addMeal: function (text, ounces) {

    // Make sure the user is logged in before inserting a meal
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Meals.insert({
      text: text,
      ounces: ounces,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteMeal: function (mealId) {
    Meals.remove(mealId);
  },
  setCheckedMeal: function (mealId, setChecked) {
      var meal = Meals.findOne(mealId);
      if (meal.private && meal.owner !== Meteor.userId()) {
        // If the meal is private, make sure only the owner can check it off
        throw new Meteor.Error("not-authorized");
      }
    Meals.update(mealId, { $set: { checked: setChecked} });
  },
  setPrivateMeal: function (mealId, setToPrivate) {
      var meal = Meals.findOne(mealId);
 
      // Make sure only the meal owner can make a meal private
      if (meal.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
 
      Meals.update(mealId, { $set: { private: setToPrivate } });
  }
  });


/*********************************
*
*    Diaper list methods
*
*********************************/

  Meteor.methods({

    addDiaper: function (text, mess) {

    // Make sure the user is logged in before inserting a diaper
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Diapers.insert({
      text: text,
      mess: mess,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteDiaper: function (diaperId) {
    Diapers.removed(diaperId);
  },
  setCheckedDiaper: function (diaperId, setChecked) {
      var diaper = Diapers.findOne(diaperId);
      if (diaper.private && diaper.owner !== Meteor.userId()) {
        // If the diaper is private, make sure only the owner can check it off
        throw new Meteor.Error("not-authorized");
      }
    Diapers.update(diaperId, { $set: { checked: setChecked} });
  },
  setPrivateDiaper: function (diaperId, setToPrivate) {
      var diaper = Diapers.findOne(diaperId);
 
      // Make sure only the diaper owner can make a diaper private
      if (diaper.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
 
      Diapers.update(diaperId, { $set: { private: setToPrivate } });
  }
  });



/*********************************
*
*   Publish collections
*
*********************************/


  Meteor.publish("tasks", function () {
    return Tasks.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });

  Meteor.publish("meals", function () {
    return Meals.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });


  Meteor.publish("diapers", function () {
    return Diapers.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });

}
