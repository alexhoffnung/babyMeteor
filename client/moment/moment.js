Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD hh:mm a');
});