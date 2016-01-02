Template.mealChart.helpers ({
  mealsPerDay: function () {
    var today = moment().startOf('day').toDate();
    var activeBaby = Session.get('activeBaby');
    var currentUserId = Meteor.userId();
    console.log("date: " + today)
    var mealWeek = [
    	moment().add(-7,'days').startOf('day'),
    	moment().add(-6,'days').startOf('day'),
    	moment().add(-5,'days').startOf('day'),
    	moment().add(-4,'days').startOf('day'),
    	moment().add(-3,'days').startOf('day'),
    	moment().add(-2,'days').startOf('day'),
    	moment().add(-1,'days').startOf('day')
    ];
    console.log(mealWeek[6]._d);
    var dayOneCount = Meals.find({ $and: [ {createdAtStart:mealWeek[0]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayTwoCount = Meals.find({ $and: [ {createdAtStart:mealWeek[1]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayThreeCount = Meals.find({ $and: [ {createdAtStart:mealWeek[2]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayFourCount = Meals.find({ $and: [ {createdAtStart:mealWeek[3]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayFiveCount = Meals.find({ $and: [ {createdAtStart:mealWeek[4]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var daySixCount = Meals.find({ $and: [ {createdAtStart:mealWeek[5]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var daySevenCount = Meals.find({ $and: [ {createdAtStart:mealWeek[6]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    console.log(daySevenCount)
  return ((dayOneCount + dayTwoCount + dayThreeCount + dayFourCount + dayFiveCount + daySixCount + daySevenCount)/7).toFixed(0);;
  }
});