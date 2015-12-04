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
    var meal = Meals.findOne(mealId);
    if (meal.private && meal.owner !== Meteor.userId()) {
      // If the meal is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
 
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
    var diaper = Diapers.findOne(diaperId);
    if (diaper.private && diaper.owner !== Meteor.userId()) {
      // If the diaper is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
 
      Diapers.remove(diaperId);
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
*    Sleep list methods
*
*********************************/

  Meteor.methods({
    addSleep: function (text, direction) {

    // Make sure the user is logged in before inserting a sleep
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Sleeps.insert({
      text: text,
      direction: direction,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
    deleteSleep: function (sleepId) {
    var sleep = Sleeps.findOne(sleepId);
    if (sleep.private && sleep.owner !== Meteor.userId()) {
      // If the sleep is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
 
      Sleeps.remove(sleepId);
    },
  setCheckedSleep: function (sleepId, setChecked) {
      var sleep = Sleeps.findOne(sleepId);
      if (sleep.private && sleep.owner !== Meteor.userId()) {
        // If the sleep is private, make sure only the owner can check it off
        throw new Meteor.Error("not-authorized");
      }
    Sleeps.update(sleepId, { $set: { checked: setChecked} });
  },
  setPrivateSleep: function (sleepId, setToPrivate) {
      var sleep = Sleeps.findOne(sleepId);
 
      // Make sure only the sleep owner can make a sleep private
      if (sleep.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
 
      Sleeps.update(sleepId, { $set: { private: setToPrivate } });
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

  Meteor.publish("sleeps", function () {
    return Sleeps.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });

  Meteor.publish("calendarEvent", function () {
    return CalendarEvent.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });

  Meteor.publish("babies", function () {
    return Babies.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });

}




/*********************************
*
*   Calendar events
*
*********************************/

  Meteor.methods({
    removeAllEvents: function() {
      return CalendarEvent.remove({});
    },

    addEvent: function (startDate, title) {

      // Make sure the user is logged in before inserting a sleep
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      console.log(startDate + title);
      console.log(Meteor.user().username);
      CalendarEvent.insert({
        title: title,
        startDate: startDate,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    }

  });


/*********************************
*
*   Baby events
*
*********************************/

  Meteor.methods({
    removeAllBabies: function() {
      return Babies.remove({});
    },

    addBaby: function (babyName, activeState) {

      // Make sure the user is logged in before inserting a sleep
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Babies.insert({
        babyName: babyName,
        activeState: activeState,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    },   
    deleteBaby: function (babyId) {
    var baby = Babies.findOne(babyId);
    if (baby.private && baby.owner !== Meteor.userId()) {
      // If the baby is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
 
      Babies.remove(babyId);
    },
      setCheckedBaby: function (babyId, setChecked) {
      var baby = Babies.findOne(babyId);
      if (baby.private && baby.owner !== Meteor.userId()) {
        // If the baby is private, make sure only the owner can check it off
        throw new Meteor.Error("not-authorized");
      }
    Babies.update(babyId, { $set: { checked: setChecked} });
  },
  setPrivateBaby: function (babyId, setToPrivate) {
      var baby = Babies.findOne(babyId);
 
      // Make sure only the baby owner can make a baby private
      if (baby.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
 
      Babies.update(babyId, { $set: { private: setToPrivate } });
  },
  setActiveBaby: function (babyId, setToActive) {
      var baby = Babies.findOne(babyId);
 
      // Make sure only the baby owner can make a baby private
      if (baby.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
 
      Babies.update(babyId, { $set: { activeState: setToActive } });
  }

  });