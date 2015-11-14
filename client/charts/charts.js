if (Meteor.isClient) {
  // This code only runs on the client
Template.charts.onRendered(function () {

    new Chartist.Bar('.ct-chart', {
      labels: ['wet', 'dirty'],
      series: [20, 60]
    }, {
      distributeSeries: true
    });

})
}