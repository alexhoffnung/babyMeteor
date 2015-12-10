/*********************************
*
*   Calendar events
*
*********************************/

  Meteor.methods({
    removeAllEvents: function() {
      return CalendarEvent.remove({});
    },

    addEvent: function (startDate, title) {

      // Make sure the user is logged in before inserting a sleep
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      console.log(startDate + title);
      console.log(Meteor.user().username);
      CalendarEvent.insert({
        title: title,
        startDate: startDate,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    }

  });