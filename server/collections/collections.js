Meteor.publish("tasks", function () {
  return Tasks.find({ owner: this.userId });
});

Meteor.publish("meals", function () {
  return Meals.find({ owner: this.userId });
});

Meteor.publish("diapers", function () {
  return Diapers.find({ owner: this.userId });
});

Meteor.publish("sleeps", function () {
  return Sleeps.find({ owner: this.userId });
});

Meteor.publish("calendarEvent", function () {
  return CalendarEvent.find({ owner: this.userId });
});

Meteor.publish("caretakers", function () {
  return Caretakers.find({ owner: this.userId });
});

Meteor.publish("babies", function () {
  return Babies.find({ owner: this.userId });
});