if (Meteor.isClient) {
  // This code only runs on the client
Template.charts.onRendered(function () {
    // Get current user id
    var currentUserId = Meteor.userId();
    
    var data = {
    labels: ['wet', 'dirty'],
    series: [
        Diapers.find( { $and: [ {checked: {$ne: true}}, { owner:currentUserId } ] } ).count(),
        Diapers.find( { $and: [ {checked: {$ne: false}}, { owner:currentUserId } ] } ).count()
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