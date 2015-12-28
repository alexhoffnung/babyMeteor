/*********************************
*
*   Publish collections
*
*********************************/


  Meteor.publish("tasks", function () {
    return Tasks.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });

  Meteor.publish("meals", function () {
    return Meals.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });


  Meteor.publish("diapers", function () {
    return Diapers.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });

  Meteor.publish("sleeps", function () {
    return Sleeps.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });

  Meteor.publish("calendarEvent", function () {
    return CalendarEvent.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });

  Meteor.publish("caretakers", function () {
    return Caretakers.find({
      $or: [
        { owner: this.userId }
      ]
    });
  });

  Meteor.publish("babies", function () {
    return Babies.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });