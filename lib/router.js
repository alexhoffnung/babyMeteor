Router.configure({
	layoutTemplate: 'layoutUser',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.onBeforeAction(function() {
  var currentUserId = Meteor.userId();
  var babyCount = Babies.find({owner:currentUserId}).count();
  if (! Meteor.userId()) {
    Router.go('/login');
    this.next();
  } else if ( babyCount === 0 ) {
    //add a baby
    Router.go('/babies');
    $('#modal-content').modal({
      show: true
    });
    console.log("YES!")
    this.next();
  }
  else {
    this.next();
  }
});

Router.route('/login', function() {
  this.render('login');
  this.layout(null);
});


//Simple Routes Config.
Router.route('/', {name: "gotbaby"});

Router.route('/meals', {name: "meals"});

Router.route('/diapers', {name: "diapers"});

Router.route('/sleeps', {name: "sleeps"});

Router.route('/welcome', {name: "welcome"});

Router.route('/tasks', {name: "tasks"});

Router.route('/calendar', {name: "calendar"});

Router.route('/charts', {name: "charts"});

Router.route('/profile', {name: "profile"});

Router.route('/caretakers', {name: "caretakers"});

Router.route('/uploads', {name: "uploads"});

Router.route('/babies', {name: "babies"});

