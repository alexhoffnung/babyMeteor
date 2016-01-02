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

Router.route('/mealchart', {name: "mealChart"});

Router.route('/profile', {name: "profile"});

Router.route('/caretakers', {name: "caretakers"});

Router.route('/uploads', {name: "uploads"});

Router.route('/babies', {name: "babies"});

