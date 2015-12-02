if (Meteor.isClient) {
  Meteor.subscribe("CalendarEvent");

	$('#calendar').fullCalendar({
	    defaultView: 'agendaDay',
	    events: [
	        // events go here
	    ],
	    resources: [
	        // resources go here
	    ]
	    // other options go here...
	});

	Template.calendar.rendered = function(){
		var calendar = $('#calendar').fullCalendar({

			editable: true,

			events:function(start,callback){
				let currentUserId = Meteor.userId();
				let calEvents = CalendarEvent.find({'userID':currentUserId},{reactive:false}).fetch();

				let events = [];
	        	calEvents.forEach(function(e) {
	        		events.push({
		            title: e.title,
		            start: e.start,
		          });
	        	});
	    		callback(events);
			},
		})
	}

	Template.calendar.helpers({
		calEvent: function(){
		  let currentUserId = Meteor.userId();
	      return CalendarEvent.find({'userID':currentUserId});
	    }
	});

	Template.calendar.events({
		'click #addEvent': function(){
			let startDate = new Date($('#start-date').val());
			startDate.setTime( startDate.getTime() + startDate.getTimezoneOffset()*60*1000 );
	  		let title = $('#title').val();
	  		Meteor.call('addEvent', startDate, title);
		},

		'click #removeEvents': function(){
			Meteor.call('removeAllEvents');
		}
	})
}

