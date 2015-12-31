if (Meteor.isClient) {
  // This code only runs on the client
Template.charts.onRendered(function () {
    // Get current user id
    var currentUserId = Meteor.userId();
    var activeBaby = Session.get("activeBaby");
    var data = {
    labels: ['wet', 'dirty'],
    series: [
        Diapers.find( { $and: [ {mess:"wet"}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count(),
        Diapers.find( { $and: [ {mess:"dirty"}, {babyName: activeBaby}, { owner:currentUserId } ] } ).count()
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
        labelOffset: 80,
        chartPadding: 20
      }]
    ];

    new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
    });

}