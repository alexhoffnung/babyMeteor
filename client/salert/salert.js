Template.alert.events({
    'click .alert-click-class': function (e) {
        e.preventDefault();
        console.log('Alert link clicked!');
        sAlert.info('');
    }
});

UI.registerHelper('formatTime', function(context, options) {
  if(context)
    return moment(context).format('hh:mm');
});

Template.sAlertCustom.helpers({
  "lastMeal": function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({
      $and: [
        {owner:currentUserId},
        {activeState:true}
      ]
    });

    var meal = Meals.findOne( 
      { $and: [ 
        {babyId:activeBaby._id},
        {owner:currentUserId}
        ] 
      },
      { sort: {createdAt:-1}}
    );

    return meal;
  },
  "lastDiaper": function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({
      $and: [
        {owner:currentUserId},
        {activeState:true}
      ]
    });

    var diaper = Diapers.findOne( 
      { $and: [ 
        {babyId:activeBaby._id},
        {owner:currentUserId}
        ] 
      },
      { sort: {createdAt:-1}}
    );

    return diaper;
  },
  "lastSleep": function () {
    var currentUserId = Meteor.userId();
    var activeBaby = Babies.findOne({
      $and: [
        {owner:currentUserId},
        {activeState:true}
      ]
    });

    var sleep = Sleeps.findOne( 
      { $and: [ 
        {babyId:activeBaby._id},
        {owner:currentUserId}
        ] 
      },
      { sort: {createdAt:-1}}
    );

    return sleep;
  }
});

Meteor.startup(function () {

    sAlert.config({
        effect: 'genie',
        position: 'top',
        timeout: 3000,
        html: true,
        onRouteClose: true,
        stack: false,
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 150, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
        onClose: _.noop //
        // examples:
        // onClose: function() {
        //     /* Code here will be executed once the alert closes. */
        // }
    });

});