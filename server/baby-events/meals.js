Meteor.methods({
  addMeal: function (text, ounces) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var activeBaby = Babies.findOne({
      $and: [
        { owner:Meteor.userId() },
        { activeState:true }
      ]
    });

    Meals.insert({
      text: text,
      ounces: ounces,
      babyId: activeBaby._id,
      createdAt: new Date(),
      createdAtStart: moment().startOf('day').toDate(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteMeal: function (mealId) {
    var meal = Meals.findOne(mealId);
    if (meal.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Meals.remove(mealId);
  }
});
