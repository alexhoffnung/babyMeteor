Router.configure({
	layoutTemplate: 'layoutUser',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
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

Router.route('babyProfile', {
  name: 'babyProfile',
  path: '/babies/:slug',
  template: 'babyProfile',
   subscriptions: function() {
     return Meteor.subscribe('babyProfile', this.params.slug);
   },
  data: function() {
    var baby = Babies.findOne({"userId": Meteor.userId(), "slug": this.params.slug});
    if (baby) {
      return baby;
    }
  }
  // onBeforeAction: function() {
  //   Session.set('currentRoute', null);
  //   Session.set('isSinglePost', true);
  //   this.next();
  // }
});

