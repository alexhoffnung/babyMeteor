Router.configure({ layoutTemplate: 'layoutUser'});

Router.configure({
	layoutTemplate: 'layoutUser',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});


Router.onBeforeAction('loading');

//Simple Routes Config.

Router.route('/gotbaby', {
    layoutTemplate: 'layoutUser'
});

Router.route('/meals', {name: "meals"});

Router.route('/diapers', {name: "diapers"});

Router.route('/sleeps', {name: "sleeps"});

Router.route('/', {name: "welcome"});

Router.route('/tasks', {name: "tasks"});

Router.route('/calendar', {name: "calendar"});

Router.route('/charts', {name: "charts"});

Router.route('/profile', {name: "profile"});

Router.route('/dynamic', {
  name: 'dynamic',
  template: 'dynamicFields'
});

Router.route('/babies', {name: "babies"});

Router.route('/uploads', {name: "uploads"});