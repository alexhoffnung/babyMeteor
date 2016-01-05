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
      var fourOz = Meals.find( 
        { $and: [ 
          { ounces:"4" }, 
          { babyName:activeBaby }, 
          { owner:currentUserId } ] 
        } 
      ).count();
      var sixOz = Meals.find( 
        { $and: [ 
          { ounces:"6" }, 
          { babyName:activeBaby }, 
          { owner:currentUserId } ] 
        } 
      ).count();
      return ((2*Number(twoOz) + 4*Number(fourOz) + 6*Number(sixOz))/(Number(twoOz) + Number(fourOz) + Number(sixOz))).toFixed(0);;
  },

});

Template.charts.onRendered(function () {
    // Get current user id
    var currentUserId = Meteor.userId();
    var activeBaby = Session.get("activeBaby");

    var today = new Date();
//
    var lastWeek = [
      moment().add(-7,'days').startOf('day'),
      moment().add(-6,'days').startOf('day'),
      moment().add(-5,'days').startOf('day'),
      moment().add(-4,'days').startOf('day'),
      moment().add(-3,'days').startOf('day'),
      moment().add(-2,'days').startOf('day'),
      moment().add(-1,'days').startOf('day')
    ];

    var dayOneOunceTwo = Meals.find({ $and: [ {ounces:"2"}, {createdAtStart:lastWeek[0]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayTwoOunceTwo = Meals.find({ $and: [ {ounces:"2"}, {createdAtStart:lastWeek[1]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayThreeOunceTwo = Meals.find({ $and: [ {ounces:"2"}, {createdAtStart:lastWeek[2]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayFourOunceTwo = Meals.find({ $and: [ {ounces:"2"}, {createdAtStart:lastWeek[3]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayFiveOunceTwo = Meals.find({ $and: [ {ounces:"2"}, {createdAtStart:lastWeek[4]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var daySixOunceTwo = Meals.find({ $and: [ {ounces:"2"}, {createdAtStart:lastWeek[5]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var daySevenOunceTwo = Meals.find({ $and: [ {ounces:"2"}, {createdAtStart:lastWeek[6]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();

    var dayOneOunceFour = Meals.find({ $and: [ {ounces:"4"}, {createdAtStart:lastWeek[0]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayTwoOunceFour = Meals.find({ $and: [ {ounces:"4"}, {createdAtStart:lastWeek[1]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayThreeOunceFour = Meals.find({ $and: [ {ounces:"4"}, {createdAtStart:lastWeek[2]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayFourOunceFour = Meals.find({ $and: [ {ounces:"4"}, {createdAtStart:lastWeek[3]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayFiveOunceFour = Meals.find({ $and: [ {ounces:"4"}, {createdAtStart:lastWeek[4]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var daySixOunceFour = Meals.find({ $and: [ {ounces:"4"}, {createdAtStart:lastWeek[5]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var daySevenOunceFour = Meals.find({ $and: [ {ounces:"4"}, {createdAtStart:lastWeek[6]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();

    var dayOneOunceSix = Meals.find({ $and: [ {ounces:"6"}, {createdAtStart:lastWeek[0]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayTwoOunceSix = Meals.find({ $and: [ {ounces:"6"}, {createdAtStart:lastWeek[1]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayThreeOunceSix = Meals.find({ $and: [ {ounces:"6"}, {createdAtStart:lastWeek[2]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayFourOunceSix = Meals.find({ $and: [ {ounces:"6"}, {createdAtStart:lastWeek[3]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var dayFiveOunceSix = Meals.find({ $and: [ {ounces:"6"}, {createdAtStart:lastWeek[4]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var daySixOunceSix = Meals.find({ $and: [ {ounces:"6"}, {createdAtStart:lastWeek[5]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();
    var daySevenOunceSix = Meals.find({ $and: [ {ounces:"6"}, {createdAtStart:lastWeek[6]._d}, { owner:currentUserId }, { babyName:activeBaby }] }).count();

    var dayOneWet = Diapers.find( { $and: [ {mess:"wet"}, {createdAtStart:lastWeek[0]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();
    var dayTwoWet = Diapers.find( { $and: [ {mess:"wet"}, {createdAtStart:lastWeek[1]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();
    var dayThreeWet = Diapers.find( { $and: [ {mess:"wet"}, {createdAtStart:lastWeek[2]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();
    var dayFourWet = Diapers.find( { $and: [ {mess:"wet"}, {createdAtStart:lastWeek[3]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();
    var dayFiveWet = Diapers.find( { $and: [ {mess:"wet"}, {createdAtStart:lastWeek[4]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();
    var daySixWet = Diapers.find( { $and: [ {mess:"wet"}, {createdAtStart:lastWeek[5]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();
    var daySevenWet = Diapers.find( { $and: [ {mess:"wet"}, {createdAtStart:lastWeek[6]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();

    var dayOneDirty = Diapers.find( { $and: [ {mess:"dirty"}, {createdAtStart:lastWeek[0]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();
    var dayTwoDirty = Diapers.find( { $and: [ {mess:"dirty"}, {createdAtStart:lastWeek[1]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();
    var dayThreeDirty = Diapers.find( { $and: [ {mess:"dirty"}, {createdAtStart:lastWeek[2]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();
    var dayFourDirty = Diapers.find( { $and: [ {mess:"dirty"}, {createdAtStart:lastWeek[3]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();
    var dayFiveDirty = Diapers.find( { $and: [ {mess:"dirty"}, {createdAtStart:lastWeek[4]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();
    var daySixDirty = Diapers.find( { $and: [ {mess:"dirty"}, {createdAtStart:lastWeek[5]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();
    var daySevenDirty = Diapers.find( { $and: [ {mess:"dirty"}, {createdAtStart:lastWeek[6]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count();    

    var dayOneSleep = Sleeps.find()

    var dayOneSleepTotal=0;
    var cursor=Sleeps.find({ $and: [ {createdAtStart:lastWeek[6]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ); 
     cursor.forEach(function(nap){
       dayOneSleepTotal = dayOneSleepTotal + nap.napLength;
     });

    var dayTwoSleepTotal=0;
    var cursor=Sleeps.find({ $and: [ {createdAtStart:lastWeek[5]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ); 
     cursor.forEach(function(nap){
       dayTwoSleepTotal = dayTwoSleepTotal + nap.napLength;
     });

    var dayThreeSleepTotal=0;
    var cursor=Sleeps.find({ $and: [ {createdAtStart:lastWeek[4]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ); 
     cursor.forEach(function(nap){
       dayThreeSleepTotal = dayThreeSleepTotal + nap.napLength;
     });

    var dayFourSleepTotal=0;
    var cursor=Sleeps.find({ $and: [ {createdAtStart:lastWeek[3]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ); 
     cursor.forEach(function(nap){
       dayFourSleepTotal = dayFourSleepTotal + nap.napLength;
     });

    var dayFiveSleepTotal=0;
    var cursor=Sleeps.find({ $and: [ {createdAtStart:lastWeek[2]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ); 
     cursor.forEach(function(nap){
       dayFiveSleepTotal = dayFiveSleepTotal + nap.napLength;
     });

    var daySixSleepTotal=0;
    var cursor=Sleeps.find({ $and: [ {createdAtStart:lastWeek[1]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ); 
     cursor.forEach(function(nap){
       daySixSleepTotal = daySixSleepTotal + nap.napLength;
     });

    var daySevenSleepTotal=0;
    var cursor=Sleeps.find({ $and: [ {createdAtStart:lastWeek[0]._d}, {babyName: activeBaby}, { owner:currentUserId } ] } ); 
     cursor.forEach(function(nap){
       daySevenSleepTotal = daySevenSleepTotal + nap.napLength;
     });

    var diaperData = {
    labels: [
      lastWeek[0].format('ddd'),
      lastWeek[1].format('ddd'),
      lastWeek[2].format('ddd'),
      lastWeek[3].format('ddd'),
      lastWeek[4].format('ddd'),
      lastWeek[5].format('ddd'),
      lastWeek[6].format('ddd')
    ],
    series: [
        [dayOneWet,dayTwoWet,dayThreeWet,dayFourWet,dayFiveWet,daySixWet,daySevenWet],
        [dayOneDirty,dayTwoDirty,dayThreeDirty,dayFourDirty,dayFiveDirty,daySixDirty,daySevenDirty]
    ]
    };
    var mealData = {
    labels: [
      lastWeek[0].format('ddd'),
      lastWeek[1].format('ddd'),
      lastWeek[2].format('ddd'),
      lastWeek[3].format('ddd'),
      lastWeek[4].format('ddd'),
      lastWeek[5].format('ddd'),
      lastWeek[6].format('ddd')
    ],
    series: [[
        (2 * dayOneOunceTwo) + (4 * dayOneOunceFour) + (6 * dayOneOunceSix),
        (2 * dayTwoOunceTwo) + (4 * dayTwoOunceFour) + (6 * dayTwoOunceSix),
        (2 * dayThreeOunceTwo) + (4 * dayThreeOunceFour) + (6 * dayThreeOunceSix),
        (2 * dayFourOunceTwo) + (4 * dayFourOunceFour) + (6 * dayFourOunceSix),
        (2 * dayFiveOunceTwo) + (4 * dayFiveOunceFour) + (6 * dayFiveOunceSix),
        (2 * daySixOunceTwo) + (4 * daySixOunceFour) + (6 * daySixOunceSix),
        (2 * daySevenOunceTwo) + (4 * daySevenOunceFour) + (6 * daySevenOunceSix)
    ]]
    };
    var sleepData = {
    labels: [
      lastWeek[0].format('ddd'),
      lastWeek[1].format('ddd'),
      lastWeek[2].format('ddd'),
      lastWeek[3].format('ddd'),
      lastWeek[4].format('ddd'),
      lastWeek[5].format('ddd'),
      lastWeek[6].format('ddd')
    ],
    series: [[
        (2 * dayOneOunceTwo) + (4 * dayOneOunceFour) + (6 * dayOneOunceSix),
        (2 * dayTwoOunceTwo) + (4 * dayTwoOunceFour) + (6 * dayTwoOunceSix),
        (2 * dayThreeOunceTwo) + (4 * dayThreeOunceFour) + (6 * dayThreeOunceSix),
        (2 * dayFourOunceTwo) + (4 * dayFourOunceFour) + (6 * dayFourOunceSix),
        (2 * dayFiveOunceTwo) + (4 * dayFiveOunceFour) + (6 * dayFiveOunceSix),
        (2 * daySixOunceTwo) + (4 * daySixOunceFour) + (6 * daySixOunceSix),
        (2 * daySevenOunceTwo) + (4 * daySevenOunceFour) + (6 * daySevenOunceSix)
    ]]
    };
    var options = {
      labelInterpolationFnc: function(value) {
        return value[0]
      },
      stackBars: true,
      onlyInteger: true
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
    new Chartist.Line('#sleep-chart', sleepData, options, responsiveOptions);

});