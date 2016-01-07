/*********************************
*
*    Meal list methods
*
*********************************/

  Meteor.methods({

    addMeal: function (text, ounces, activeBaby) {

    // Make sure the user is logged in before inserting a meal
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Meals.insert({
      text: text,
      ounces: ounces,
      babyId: activeBaby,
      createdAt: new Date(),
      createdAtStart: moment().startOf('day').toDate(),
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
