Template.charts.helpers({
    averageOunces: function () {
      var currentUserId = Meteor.userId();
      var activeBaby = Session.get("activeBaby");
      var today = new Date();
      console.log(today);
      var twoOz = Meals.find( 
        { $and: [ 
          { ounces:"2" }, 
          { babyName:activeBaby }, 
          { owner:currentUserId } ] 
        } 
      ).count();
      return twoOz;
  }
});

Template.charts.onRendered(function () {
    // Get current user id
    var currentUserId = Meteor.userId();
    var activeBaby = Session.get("activeBaby");
    var diaperData = {
    labels: ['wet', 'dirty'],
    series: [[
        Diapers.find( { $and: [ {mess:"wet"}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count(),
        Diapers.find( { $and: [ {mess:"dirty"}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count()
    ]]
    };
    var mealData = {
    labels: ['2oz', '4oz','6oz'],
    series: [[
        Meals.find( { $and: [ {ounces:"2"}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count(),
        Meals.find( { $and: [ {ounces:"4"}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count(),
        Meals.find( { $and: [ {ounces:"6"}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count()

    ]]
    };
    var sleepData = {
    labels: ['down', 'up'],
    series: [
        Sleeps.find( { $and: [ {direction:"up"}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count(),
        Sleeps.find( { $and: [ {direction:"down"}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count()
    ]
    };
    var options = {
      labelInterpolationFnc: function(value) {
        return value[0]
      }
    };

    var responsiveOptions = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      ['screen and (min-width: 1024px)', {
        labelOffset: 20,
        chartPadding: 20
      }]
    ];

    new Chartist.Bar('#diaper-chart', diaperData, options, responsiveOptions);
    new Chartist.Bar('#meal-chart', mealData, options, responsiveOptions);
    new Chartist.Pie('#sleep-chart', sleepData, options, responsiveOptions);

});